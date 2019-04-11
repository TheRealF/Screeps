var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require("role.repairer")

module.exports.loop = function () {
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    console.log('Harvesters: ' + harvesters.length);
    var builders =   _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    console.log('Builders: ' + builders.length);
    var ups =   _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    console.log("Upgraders: " + ups.length);
    var rep =   _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');
    console.log("Repairers: " + rep.length);
    if(harvesters.length < 4) {
        var newName = 'Harvester' + Game.time;
        console.log('Spawning new harvester: ' + newName);
        Game.spawns['Kingdom'].spawnCreep([WORK,CARRY,MOVE], newName, 
            {memory: {role: 'harvester'}});
    }
    if(builders.length < 5) {
        var newName = 'Builder' + Game.time;
        console.log('Spawning new builder: ' + newName);
        Game.spawns['Kingdom'].spawnCreep([WORK,CARRY,MOVE], newName, 
            {memory: {role: 'builder'}});
    }
    if(ups.length < 7) {
        var newName = 'Up' + Game.time;
        console.log('Spawning new upgrader: ' + newName);
        Game.spawns['Kingdom'].spawnCreep([WORK,CARRY,MOVE], newName, 
            {memory: {role: 'upgrader'}});
    }
    if(rep.length < 5) {
        var newName = 'Rep' + Game.time;
        console.log('Spawning new upgrader: ' + newName);
        Game.spawns['Kingdom'].spawnCreep([WORK,CARRY,MOVE], newName, 
            {memory: {role: 'repairer'}});
    }
    if(Game.spawns['Kingdom'].spawning) { 
        var spawningCreep = Game.creeps[Game.spawns["Kingdom"].spawning.name];
        Game.spawns['Kingdom'].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns['Kingdom'].pos.x + 1, 
            Game.spawns['Kingdom'].pos.y, 
            {align: 'left', opacity: 0.8});
    }

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
         if(creep.memory.role == 'repairer') {
            roleRepairer.run(creep);
        }
    }
}