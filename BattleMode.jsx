import React, { useState } from 'react';
import { APP_DB } from '../data';

const BattleMode = () => {
  const [leftId, setLeftId] = useState(APP_DB.Universities[0].id);
  const [rightId, setRightId] = useState(APP_DB.Universities[1].id);

  const leftUni = APP_DB.Universities.find(u => u.id === leftId);
  const rightUni = APP_DB.Universities.find(u => u.id === rightId);

  const renderStat = (label, val1, val2) => (
    <div className="grid grid-cols-3 gap-4 py-3 border-b border-gray-100 dark:border-slate-800">
      <div className="text-right font-medium dark:text-gray-300">{val1}</div>
      <div className="text-center text-gray-500 text-xs uppercase tracking-wider mt-1">{label}</div>
      <div className="text-left font-medium dark:text-gray-300">{val2}</div>
    </div>
  );

  return (
    <div className="p-6 bg-white dark:bg-slate-900 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center dark:text-white">University Battle</h2>
      
      <div className="flex justify-between mb-8">
        <select 
          className="p-2 rounded border dark:bg-slate-800 dark:text-white"
          value={leftId} onChange={(e) => setLeftId(e.target.value)}
        >
          {APP_DB.Universities.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
        </select>
        <span className="text-2xl font-black text-red-500">VS</span>
        <select 
           className="p-2 rounded border dark:bg-slate-800 dark:text-white"
           value={rightId} onChange={(e) => setRightId(e.target.value)}
        >
          {APP_DB.Universities.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
        </select>
      </div>

      <div className="space-y-2">
        {renderStat("Cost ($)", leftUni.cost, rightUni.cost)}
        {renderStat("Ranking", leftUni.ranking, rightUni.ranking)}
        {renderStat("IELTS Req", leftUni.requirements.ielts, rightUni.requirements.ielts)}
        {renderStat("Country", leftUni.country, rightUni.country)}
      </div>
      
      <div className="mt-6 flex gap-4 justify-center">
        <div className="w-1/2 text-center">
           <img src={leftUni.image} alt="left" className="h-32 w-full object-cover rounded-lg mb-2 opacity-80" />
           <div className="font-bold text-blue-600">{leftUni.grants.length} Grants Available</div>
        </div>
        <div className="w-1/2 text-center">
           <img src={rightUni.image} alt="right" className="h-32 w-full object-cover rounded-lg mb-2 opacity-80" />
           <div className="font-bold text-blue-600">{rightUni.grants.length} Grants Available</div>
        </div>
      </div>
    </div>
  );
};

export default BattleMode;