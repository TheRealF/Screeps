Sources.sourcePriority = function(source) {
    let priority;
    if (source.ticksToRegeneration == undefined) {
        priority = 10;
    } else if (source.energy == 0) {
        priority = 0;
    } else {
        priority = source.energy / source.ticksToRegeneration;
    }
    if (priority > 0 && source.ticksToRegeneration < 150) {
        priority = priority * (1 + (150 - source.ticksToRegeneration)/250);
        if (source.ticksToRegeneration < 70) {
            priority = priority + (70 - source.ticksToRegeneration)/10;
        }
    }
    return priority;
};
