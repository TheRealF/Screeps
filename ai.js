module.exports = function () {
    var preDef = { //predefined creep classes (body and memory)
        harvester:{body: [Game.WORK, Game.CARRY, Game.MOVE], memory: {role: 'harvester'}},
        collector:{body: [Game.WORK, Game.CARRY, Game.MOVE, Game.MOVE], memory: {role: 'collector'}},
        guard:{body: [Game.TOUGH, Game.ATTACK, Game.MOVE, Game.MOVE], memory:{role: 'guard'}},
        healer:{body: [Game.HEAL, Game.HEAL, Game.MOVE, Game.MOVE], memory:{role: 'healer'}},
        tower:{body: [Game.RANGED_ATTACK, Game.RANGED_ATTACK, Game.MOVE], memory:{role: 'tower'}},
        builder:{body: [Game.WORK, Game.WORK, Game.WORK, Game.CARRY, Game.MOVE], memory:{role: 'builder'}},
        hunter: {body: [Game.MOVE, Game.RANGED_ATTACK, Game.MOVE, Game.ATTACK], memory:{role: 'hunter'}}
    };
    var creeps = { //list of creeps I want to exist
        Harvester1: preDef.collector,
        Harvester2: preDef.harvester,
        Tower1: preDef.tower,
        Healer1: {body: [Game.HEAL, Game.HEAL, Game.MOVE, Game.MOVE], memory:{follow_role: 'tower',role: 'healer'}},
        Hunter1: preDef.hunter,
        Harvester3: preDef.harvester,
        Tower2: preDef.tower,
        Hunter2: preDef.hunter,
        Hunter3: preDef.hunter,
        Hunter4: preDef.hunter,
        Hunter5: preDef.hunter
    };

    for (var i in Game.spawns){ //for each spawn point
        var spawn = Game.spawns[i];
        // crowder pointed out bug in "if (null !== spawn.spawning) continue;"
        // changed from 'break;' to 'continue;'
        if (null !== spawn.spawning) continue; //spawn point can't be busy
        for (var name in creeps){ //for each 'to-be-created' creep
            // final name of the creep is [spawn_name]+[to_be_created_creep_name]
            if (undefined === Game.creeps[i+name]){ //if creep does not exist
                var mem = {};
                for (var attr in creeps[name].memory) {mem[attr] = creeps[name].memory[attr]; } //copy memory field
                mem.home_name = i; // assign name of spawn point to which creep will be returning 
                spawn.createCreep(creeps[name].body, i+name, mem); //create new creep with defined body, name and memory
                break; //ignore rest of 'to-be-created' creeps (spawn point should be busy). This also prevents creating creeps out of order
            }
        }
    }
};