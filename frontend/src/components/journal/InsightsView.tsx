const InsightsView = ({ entries }) => {
    // Calculate stats and trends
    const sentimentTrend = calculateSentimentTrend(entries);
    const commonThemes = extractCommonThemes(entries);
    
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Sentiment trend chart */}
        <div className="bg-white rounded-xl shadow p-4">
          <h3 className="text-lg font-medium mb-4">Mood Trends</h3>
          <div className="h-64">
            {/* Chart visualization */}
          </div>
        </div>
        
        {/* Common themes */}
        <div className="bg-white rounded-xl shadow p-4">
          <h3 className="text-lg font-medium mb-4">Common Themes</h3>
          <ul className="space-y-2">
            {commonThemes.map(theme => (
              <li key={theme.name} className="flex items-center justify-between">
                <span>{theme.name}</span>
                <div className="w-24 bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full"
                    style={{ width: `${theme.frequency * 100}%` }}
                  ></div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  };