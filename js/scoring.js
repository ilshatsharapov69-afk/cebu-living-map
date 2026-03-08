window.MAP = window.MAP || {};

MAP.computeScore = function(loc) {
    var checked = MAP.FACTORS.filter(function(f) { return MAP.checkedFactors[f.key]; });
    if (checked.length === 0) return 50;
    var sum = 0;
    for (var i = 0; i < checked.length; i++) {
        sum += (loc.ratings[checked[i].key] || 5);
    }
    return (sum / (checked.length * 10)) * 100;
};

MAP.getScore = function(loc) {
    return MAP.computeScore(loc);
};

MAP.passesFilter = function(loc) {
    for (var i = 0; i < MAP.FACTORS.length; i++) {
        var f = MAP.FACTORS[i];
        var threshold = MAP.filterThresholds[f.key];
        if (threshold > 0 && (loc.ratings[f.key] || 0) < threshold) return false;
    }
    return true;
};

MAP.scoreToColor = function(score) {
    return 'hsl(' + ((score / 100) * 120) + ', 80%, 45%)';
};

MAP.ratingToColor = function(r) {
    if (r <= 3) return '#e94560';
    if (r <= 6) return '#f5a623';
    return '#27ae60';
};
