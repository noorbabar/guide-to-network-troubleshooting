const GROUPS = [
  {
    label: 'Microsoft 365',
    categories: ['microsoft365'],
  },
  {
    label: 'Windows',
    categories: ['windows'],
  },
  {
    label: 'Network & Connectivity',
    categories: [
      'connectivity', 'performance', 'wireless', 'dns', 'vpn',
      'email', 'printer', 'video-conferencing', 'applications',
      'dhcp', 'security', 'authentication', 'hardware',
    ],
  },
];

function ScenarioCard({ scenario, onSelect }) {
  return (
    <div className="scenario-card" onClick={() => onSelect(scenario.id)}>
      <h3>{scenario.title}</h3>
      <p>{scenario.description}</p>
      <span className="start-arrow">→</span>
    </div>
  );
}

function ScenarioList({ scenarios, onSelect }) {
  return (
    <div className="scenario-groups">
      {GROUPS.map(group => {
        const groupScenarios = scenarios.filter(s =>
          group.categories.includes(s.category)
        );
        if (groupScenarios.length === 0) return null;
        return (
          <div key={group.label} className="scenario-group">
            <h2 className="group-heading">{group.label}</h2>
            <div className="scenarios-grid">
              {groupScenarios.map(scenario => (
                <ScenarioCard
                  key={scenario.id}
                  scenario={scenario}
                  onSelect={onSelect}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ScenarioList;
