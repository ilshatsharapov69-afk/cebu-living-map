window.MAP = window.MAP || {};

MAP.computeScore = function(loc) {
    var sum = 0, maxSum = 0;
    for (var i = 0; i < MAP.FACTORS.length; i++) {
        var f = MAP.FACTORS[i];
        var w = MAP.currentWeights[f.key];
        sum += loc.ratings[f.key] * w;
        maxSum += 10 * w;
    }
    return maxSum > 0 ? (sum / maxSum) * 100 : 0;
};

MAP.getScore = function(loc) {
    if (MAP.ratingMode === 'composite') return MAP.computeScore(loc);
    return (loc.ratings[MAP.ratingMode] || 5) * 10;
};

MAP.scoreToColor = function(score) {
    return 'hsl(' + ((score / 100) * 120) + ', 80%, 45%)';
};

MAP.ratingToColor = function(r) {
    if (r <= 3) return '#e94560';
    if (r <= 6) return '#f5a623';
    return '#27ae60';
};
