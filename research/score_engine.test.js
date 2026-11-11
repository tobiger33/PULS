const test=require('node:test');
const assert=require('node:assert/strict');
const e=require('./score_engine');
const P=require('./synthetic_personas.json');
const copy=x=>JSON.parse(JSON.stringify(x));
const by=id=>copy(P.find(x=>x.id===id));
test('five personas receive plausible finite score; each has four dimensions',()=>{
 for(const p of P){const s=e.computeScore(p);assert.ok(s.overall>=0&&s.overall<=100,p.id);assert.equal(Object.keys(s.domains).length,4);assert.equal(s.method,e.METHOD_VERSION)}
});
test('wealth in property and investments is not liquid emergency cash',()=>{
 const p=by('asset_rich');const a=e.computeScore(p);assert.equal(a.metrics.cash.verifiedLiquid,3200);
 assert.ok(a.metrics.cash.nonLiquid>1000000);assert.equal(a.overall,69);assert.ok(a.caps.includes('accessible_buffer_below_one_month'));
});
test('adding external verified savings can improve measured liquidity',()=>{
 const p=by('first_job');const old=e.computeScore(p);
 p.accounts.push({id:'savings-other',balance:7000,liquid:true,verified:true});
 const current=e.computeScore(p);
 assert.ok(current.domains.foundation.score>old.domains.foundation.score);
 assert.equal(e.compareSnapshots(old,current,'new_source').kind,'DATA_RESTATEMENT');
 assert.equal(e.compareSnapshots(old,current,'new_source').performanceDelta,null);
});
test('opening a new connection with no assets never creates artificial reward',()=>{
 const p=by('first_job');const s=e.computeScore(p);p.accounts.push({id:'empty-new-account',balance:0,liquid:true,verified:true});
 assert.equal(e.computeScore(p).overall,s.overall);
});
test('a duplicated account ID is not double-counted',()=>{
 const p=by('first_job');const original=e.computeScore(p);p.accounts.push({...p.accounts[0]});
 assert.equal(e.computeScore(p).overall,original.overall);assert.equal(e.computeScore(p).metrics.cash.duplicates,1);
});
test('manual/unverified cash not counted as verified liquidity',()=>{
 const p=by('first_job');const old=e.computeScore(p);p.accounts.push({id:'claimed-savings',balance:20000,liquid:true,verified:false});
 const r=e.computeScore(p);assert.equal(r.overall,old.overall);assert.equal(r.state,'PROVISIONAL');
 assert.equal(r.metrics.cash.unverifiedLiquid,20000);
});
test('declared unknown external picture is provisional and prioritizes evidence',()=>{
 const p=by('first_job');p.financialPictureReviewed=false;const s=e.computeScore(p);
 assert.equal(s.state,'PROVISIONAL');assert.equal(e.selectRecommendation(p,s).id,'complete_sources');
});
test('lack of a debt inventory must not be interpreted as zero debt',()=>{
 const p=by('first_job');p.debtsReviewed=false;const s=e.computeScore(p);
 assert.equal(s.metrics.debtPayment,null);assert.equal(s.metrics.cashflowMargin,null);
 assert.ok(s.domains.foundation.coverage<100);
});
test('lack of a cash inventory must not be interpreted as zero savings',()=>{
 const p=by('first_job');p.accountsReviewed=false;const s=e.computeScore(p);
 assert.equal(s.metrics.emergencyMonths,null);assert.ok(s.domains.foundation.coverage<100);
});
test('missing future protection is null, not zero',()=>{
 const p=by('first_job');delete p.future.incomeProtection;delete p.future.retirementPlan;
 const s=e.computeScore(p);assert.equal(s.domains.future.score,null);assert.equal(s.missing.includes('future'),true);
});
test('no confirmed upcoming plans is not penalized',()=>{
 const p=by('first_job');p.noUpcomingGoalsConfirmed=true;p.goals=[];
 const s=e.computeScore(p);assert.equal(s.domains.future.components.lifeEvents.notApplicable,true);assert.ok(s.overall!==null);
});
test('knowledge requires independent evidence; passing lesson is not a score event',()=>{
 const p=by('first_job');const old=e.computeScore(p);p.learningCompleted=100;
 assert.equal(e.computeScore(p).overall,old.overall);
 p.knowledge.independentAssessment=false;assert.equal(e.computeScore(p).domains.knowledge.score,null);
});
test('knowledge low sample cannot be treated as a stable score',()=>{
 const p=by('first_job');p.knowledge={attempted:2,correct:2,independentAssessment:true};
 assert.equal(e.computeScore(p).domains.knowledge.score,null);
});
test('unaffordable saver recommendation does not propose more savings',()=>{
 const p=by('student');p.months=p.months.map(m=>({...m,discretionary:600}));const s=e.computeScore(p);
 const r=e.selectRecommendation(p,s);assert.equal(r.id,'negative_cashflow');assert.equal(r.suggestedMonthly,null);
});
test('high-interest debt outranks savings investment routines',()=>{
 const p=by('family'),s=e.computeScore(p),r=e.selectRecommendation(p,s);
 assert.equal(r.id,'high_cost_debt');assert.equal(r.suggestedMonthly,null);
});
test('observed improvement can be displayed with same methodology',()=>{
 const p=by('student'),s1=e.computeScore(p);p.accounts[0].balance+=300;p.asOf='2026-12-11';const s2=e.computeScore(p);
 const d=e.compareSnapshots(s1,s2,'observed_change');assert.equal(d.kind,'OBSERVED_CHANGE');assert.equal(d.visibleDelta,Math.round((s2.overall-s1.overall)*10)/10);
});
test('methodology changes are never shown as performance improvement',()=>{
 const p=by('student'),a=e.computeScore(p),b={...a,method:'v2'};
 assert.equal(e.compareSnapshots(a,b).visibleDelta,null);
});
test('baseline score absent when less than 3 transaction months',()=>{
 const p=by('first_job');p.months=p.months.slice(0,2);const s=e.computeScore(p);
 assert.equal(s.overall,null);assert.equal(s.state,'INSUFFICIENT_DATA');
});
test('missing essential income records should prevent score release',()=>{
 const p=by('first_job');p.months=[];assert.equal(e.computeScore(p).overall,null);
});
test('repeated assessments have stable results for same inputs',()=>{
 const p=by('family');assert.deepEqual(e.computeScore(p),e.computeScore(p));
});
test('weight and emergency-target sensitivity measures variation',()=>{
 for(const p of P){const sensitivity=e.weightSensitivity(p);assert.ok(sensitivity.trials.length>=10);assert.ok(sensitivity.range.max>=sensitivity.range.min)}
});

test('life stage alone cannot change the financial score',()=>{
 const p=by('first_job');const score=e.computeScore(p).overall;p.lifeStage='student';assert.equal(e.computeScore(p).overall,score);
});
test('future domain can be N/A only with explicit applicability review',()=>{
 const p=by('student');assert.equal(e.computeScore(p).domains.future.notApplicable,true);
 p.future.applicabilityReviewed=false;assert.equal(e.computeScore(p).domains.future.notApplicable,undefined);
 assert.equal(e.computeScore(p).domains.future.score,null);
});

// v0.2 migration: Goal planning should not masquerade as financial health.
test('four weights sum to one; life is not a separately scored domain',()=>{
 assert.deepEqual(Object.keys(e.WEIGHTS),['foundation','behavior','future','knowledge']);
 assert.ok(Math.abs(Object.values(e.WEIGHTS).reduce((a,b)=>a+b,0)-1)<1e-12);
 const s=e.computeScore(by('first_job'));
 assert.deepEqual(Object.keys(s.domains),['foundation','behavior','future','knowledge']);
 assert.equal(s.domains.future.planningScored,false);
 assert.ok(s.domains.future.components.lifeEvents);
});
test('adding or removing a hypothetical holiday does not alter the current score',()=>{
 const p=by('first_job'),baseline=e.computeScore(p);
 p.goals=[{label:'Luxury holiday',cost:50000,targetMonth:'2027-06',reserved:0,monthlyAllocation:0}];
 assert.equal(e.computeScore(p).overall,baseline.overall);
 p.noUpcomingGoalsConfirmed=true;p.goals=[];
 assert.equal(e.computeScore(p).overall,baseline.overall);
});
test('excellent life-goal coverage cannot mask poor retirement protection',()=>{
 const p=by('first_job');
 p.future.retirementPlan='no_plan';p.future.incomeProtection='reviewed_gap';
 p.goals=[{label:'Vacation',cost:1000,targetMonth:'2027-08',reserved:1000,monthlyAllocation:0}];
 const s=e.computeScore(p);
 assert.equal(s.domains.future.score,s.domains.future.components.longTerm.score);
 assert.equal(s.domains.future.components.lifeEvents.score,100);
});
test('life-event diagnostic stays actionable inside Future Readiness',()=>{
 const p=by('first_job');p.goals=[{label:'Moving',cost:7000,targetMonth:'2027-01',reserved:200,monthlyAllocation:50}];
 const s=e.computeScore(p);
 // Clear higher priority issues for targeted life-event routing.
 p.accounts[0].balance+=100000;
 p.future.incomeProtection='reviewed_sufficient';p.future.retirementPlan='reviewed_on_track';
 const result=e.computeScore(p);
 assert.ok(result.domains.future.components.lifeEvents.score<70);
 assert.equal(result.domains.future.planningScored,false);
});
test('old vs new score versions cannot appear as observed score improvement',()=>{
 const s=e.computeScore(by('student'));
 assert.equal(e.compareSnapshots({...s,method:'PULS-RESEARCH-0.1.0'},s).kind,'METHODOLOGY_CHANGE');
});