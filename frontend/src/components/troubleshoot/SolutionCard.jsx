function SolutionCard({ solution, onRestart }) {
  const copyCommand = (command) => navigator.clipboard.writeText(command);

  return (
    <div className="solution-container">
      <div className="solution-header">
        <h2>{solution.title}</h2>
        <button onClick={onRestart} className="restart-btn">Start Over</button>
      </div>

      <div className="solution-card">
        <h3>Steps to Fix:</h3>
        <ol className="solution-steps">
          {solution.steps.map((step, i) => (
            <li key={i}>{step}</li>
          ))}
        </ol>

        {solution.commands.length > 0 && (
          <div className="solution-commands">
            <h3>Helpful Commands:</h3>
            {solution.commands.map((command, i) => (
              <div key={i} className="command-item">
                <code>{command}</code>
                <button onClick={() => copyCommand(command)} className="copy-btn-small">
                  Copy
                </button>
              </div>
            ))}
          </div>
        )}

        <button onClick={onRestart} className="btn btn-primary" style={{ marginTop: '24px' }}>
          Troubleshoot Another Issue
        </button>
      </div>
    </div>
  );
}

export default SolutionCard;
