// Basis Character Class for Monster and Player
export class Character {
    constructor(name, maxHealth, health, damage, attackSpeed, defense, dodgeChance, critChance) {
        this.name = name
        this.maxHealth = Math.round(maxHealth)
        this.health = Math.round(health)
        this.damage = damage
        this.attackSpeed = attackSpeed
        this.defense = defense
        this.dodgeChance = dodgeChance
        this.critChance = critChance

    }

    attack(enemy) {
        const actualDamage = this.calculateDamage(enemy.defense);
        console.log(`${this.name} attacks ${enemy.name} for ${actualDamage} damage!`);
        return actualDamage;
    }

    calculateDamage(monsterDefense) {
        const damageReduction = monsterDefense / 100;
        return Math.round(this.damage * (1 - damageReduction));
    }


    dodge() {
        return Math.random() < this.dodgeChance / 100;
    }

    takeDamage(damage) {
        this.health -= Math.round(damage);
        console.log(`${this.name} has ${this.health} HP left.`);
    }
}

// Monster Classes
// Refine Stats later on
export const monsterList = [
    new Character("Slime", 50, 50, 10, 2000, 2, 0, 0),
    new Character("Swarm of Rats", 60, 60, 7, 1800, 3, 0, 0),
    new Character("Kobold", 70, 70, 10, 1500, 5, 5, 5),
    new Character("Goblin", 90, 90, 12, 1200, 6, 5, 10),
    new Character("Skeleton Warrior", 50, 50, 15, 1000, 8, 10, 15),
    new Character("Orc", 140, 140, 20, 900, 10, 5, 20),
    new Character("Harpie", 180, 180, 18, 1100, 7, 25, 10),
    new Character("Troll", 200, 200, 25, 800, 15, 5, 10),
    new Character("Fire Elemental", 70, 70, 30, 700, 10, 10, 25),
    new Character("Boss", 300, 300, 50, 500, 20, 0, 30)


]

export const originalMonsterList = monsterList.map(monster => ({
    name: monster.name,
    health: monster.health,
    damage: monster.damage,
    attackSpeed: monster.attackSpeed,
    defense: monster.defense,
    dodgeChance: monster.dodgeChance,
    critChance: monster.critChance
}));
// Basis Reward Class for Items and Skills
export class Reward {
    constructor(type, name, description, rarity, effect, image) {
        this.type = type
        this.name = name
        this.description = description
        this.rarity = rarity
        this.effect = effect
        this.image = image
    }
}

//Heal Reward
export const allHealsList = [
    new Reward("Heal", "Broken Potion", "This Potion broke. You can not heal this round.", "common", (player) => player.health *= 1, "assets/images/heal-pictures/broken-potion.webp"),
    new Reward("Heal", "Small Potion", "This potion increases your current life by 25%", "uncommon", (player) => player.health *= 1.25, "assets/images/heal-pictures/small-heal.webp"),
    new Reward("Heal", "Well made Potion", "This potion increases your current life by 50%", "rare", (player) => player.health *= 1.5, "assets/images/heal-pictures/medium-heal.webp"),
    new Reward("Heal", "The blood of a dragon", "This potion increases your current life by 150%", "epic", (player) => player.health *= 2.5, "assets/images/heal-pictures/great-heal.webp")
]

// Item Class
export class Item extends Reward {
    constructor(type, name, description, rarity, effect, image) {
        super(type, name, description, rarity, effect, image);
        this.isApplied = false
    }
    applyEffect(player) {
        if (!this.isApplied) {
            this.effect(player, false); // Anwenden des Effekts
            this.isApplied = true;
        }
    }

    resetEffect(player) {
        if (this.isApplied) {
            this.effect(player, true); // Rückgängig machen des Effekts
            this.isApplied = false;
        }
    }
}

export const allItemsList = [
    // Weapons
    new Item("Item", "Rusty Short Sword", "Increases damage by 1, but its dull blade makes it less effective than other weapons.", "common", (player, state) => player.damage += state ? -1 : 1, "assets/images/items/weapons/rusty-short-sword.webp"),
    new Item("Item", "Worn Magic Staff", "Adds 2 to damage, channeling faint magical energy to enhance attacks.", "common", (player, state) => player.damage += state ? -2 : 2, "assets/images/items/weapons/worn-magic-staff.webp"),
    new Item("Item", "Flame Dagger", "Increases damage by 4, its fiery aura adds a burning effect to your strikes.", "uncommon", (player, state) => player.damage += state ? -4 : 4, "assets/images/items/weapons/flame-dagger.webp"),
    new Item("Item", "Frost Mace", "Adds 8 to damage, with its freezing cold slowing enemies upon impact.", "rare", (player, state) => player.damage += state ? -8 : 8, "assets/images/items/weapons/frost-mace.webp"),
    new Item("Item", "Stormblade", "Increases damage by 10, crackling with lightning to deliver powerful strikes.", "epic", (player, state) => player.damage += state ? -10 : 10, "assets/images/items/weapons/stormblade.webp"),

    // Helmets
    new Item("Item", "Leather Hood", "Adds 1 to defense, offering minimal protection against weak attacks.", "common", (player, state) => player.defense += state ? -1 : 1, "assets/images/items/helmets/leather-hood.webp"),
    new Item("Item", "Iron Helmet", "Increases defense by 2, providing basic protection for the wearer.", "common", (player, state) => player.defense += state ? -2 : 2, "assets/images/items/helmets/iron-helmet.webp"),
    new Item("Item", "Runed Helmet", "Boosts defense by 4 with faintly glowing runes enhancing its protective capabilities.", "uncommon", (player, state) => player.defense += state ? -4 : 4, "assets/images/items/helmets/rune-helmet.webp"),
    new Item("Item", "Guardian’s Helmet", "Adds 8 to defense, designed for those who stand firm against incoming attacks.", "rare", (player, state) => player.defense += state ? -8 : 8, "assets/images/items/helmets/guardian-helmet.webp"),
    new Item("Item", "Dragonsteel Helmet", "Increases defense by 12, its legendary craftsmanship providing unmatched protection.", "epic", (player, state) => player.defense += state ? -12 : 12, "assets/images/items/helmets/dragonsteel-helmet.webp"),

    // Armor
    new Item("Item", "Leather Jerkin", "Adds 10 to health, offering basic resistance against physical damage.", "common", (player, state) => player.health += state ? -10 : 10, "assets/images/items/armor/leather-jerkin.webp"),
    new Item("Item", "Chainmail Armor", "Boosts health by 14, providing decent protection against stronger blows.", "common", (player, state) => player.health += state ? -14 : 14, "assets/images/items/armor/chainmail-armor.webp"),
    new Item("Item", "Armored Robe", "Increases health by 20, blending mobility with added protection.", "uncommon", (player, state) => player.health += state ? -20 : 20, "assets/images/items/armor/armored-robe.webp"),
    new Item("Item", "Shadow Armor", "Adds 40 to health, allowing the wearer to blend into the shadows and avoid detection.", "rare", (player, state) => player.health += state ? -40 : 40, "assets/images/items/armor/shadow-armor.webp"),
    new Item("Item", "Titan Armor", "Boosts health by 100, its legendary durability shielding against powerful attacks.", "epic", (player, state) => player.health += state ? -100 : 100, "assets/images/items/armor/titan-armor.webp"),

    // Shoes
    new Item("Item", "Worn Boots", "Increases dodge chance by 1, offering slight agility despite their age.", "common", (player, state) => player.dodgeChance += state ? -1 : 1, "assets/images/items/shoes/worn-boots.webp"),
    new Item("Item", "Light Sandals", "Boosts dodge chance by 1, improving movement speed and evasion.", "common", (player, state) => player.dodgeChance += state ? -1 : 1, "assets/images/items/shoes/light-sandals.webp"),
    new Item("Item", "Windrunner Boots", "Adds 7 to dodge chance, their enchantment enhancing the wearer’s speed.", "uncommon", (player, state) => player.dodgeChance += state ? -7 : 7, "assets/images/items/shoes/windrunner-boots.webp"),
    new Item("Item", "Wanderer’s Boots", "Boosts dodge chance by 12, their sturdy design aiding long journeys and evasion.", "rare", (player, state) => player.dodgeChance += state ? -12 : 12, "assets/images/items/shoes/wanderers-boots.webp"),
    new Item("Item", "Phantom Shoes", "Increases dodge chance by 20, making the wearer almost ghost-like in movement.", "epic", (player, state) => player.dodgeChance += state ? -20 : 20, "assets/images/items/shoes/phantom-shoes.webp")
];

//Numbers have to be edited
//Skill Class

export class Skill extends Reward {
    constructor(type, name, description, rarity, effect, image, triggerCondition = () => true) {
        super(type, name, description, rarity, effect, image)
        this.triggerCondition = triggerCondition
        this.isApplied = false
    }

    applyEffect(player, enemy) {
        if (this.triggerCondition(player, enemy) && !this.isApplied) {
            this.effect(player, enemy); // Applies the skill's effect if the condition is met
            this.isApplied = true
        }
    }
}

export const knightSkills = [
    new Skill("Skill", "Shieldwall", "Reduces incoming damage by 15%, fortifying your defenses against attacks.", "common", (player) => player.defense = (player.defense || 0) + 0.15, "assets/images/skills/knight-skills/shieldwall.webp", (player, enemy) => true),
    new Skill("Skill", "Unyielding Will", "Grants a 10% chance to survive a lethal attack and restore full HP, keeping the fight alive.", "rare", (player) => unyieldingWill(player), "assets/images/skills/knight-skills/unyielding-will.webp", (player) => player.health === 1 && Math.random() <= 0.1)
];

function unyieldingWill(player) {
    let survive = Math.floor(Math.random() * 101)
    if (player.health == 1 && survive >= 10) {
        player.health = player.maxHealth
    }
}

export const assassinSkills = [
    new Skill("Skill", "Blinding Speed", "Increases all Stats by 10%", "common", (player) => blindingSpeed(player), "assets/images/skills/assassin-skills/blinding-speed.webp", (player) => true),

];

function blindingSpeed(player) {
    player.damage *= 1.1
    player.attackSpeed *= 1.1
    player.defense *= 1.1
    player.dodgeChance += 10
    player.critChance += 10
}

// }

export const rangerSkills = [
    new Skill("Skill", "Targeted Weakness", "Deals 20% extra damage to enemies with less than 30% HP, exploiting their vulnerabilities.", "common", (enemy) => targetedWeakness(enemy), "assets/images/skills/ranger-skills/targeted-weakness.webp", (player, enemy) => enemy.health <= enemy.maxHealth * 0.3),
    new Skill("Skill", "Repair Protocol", "Restores 2% of your maximum HP each time you successfully dodge an attack, enhancing survivability.", "common", (player) => repairProtocol(player), "assets/images/skills/ranger-skills/repair-protocol.webp", (player) => true)
];


function targetedWeakness(enemy) {
    if (enemy.healt <= (enemy.maxHealth * 0.3)) {
        enemy.defense *= 0.8
    }
}

function repairProtocol(player) {
    // Speichere die ursprüngliche Dodge-Funktion
    const originalDodge = player.dodge.bind(player);

    // Überschreibe die Dodge-Funktion des Spielers
    player.dodge = function () {
        const dodged = originalDodge(); // Aufruf der ursprünglichen Dodge-Funktion

        if (dodged) {
            const healAmount = player.maxHealth * 0.02;
            player.health = Math.min(player.health + healAmount, player.maxHealth); // HP überschreiten Maximum nicht
            console.log(`${player.name} successfully dodged and restored ${healAmount.toFixed(2)} HP!`);
        }

        return dodged; // Rückgabe, ob ausgewichen wurde
    };
}



export const universalSkills = [
    new Skill(
        "Skill",
        "Longshot",
        "Reduces attack speed by 50%, but increases damage dealt by 200%, ideal for calculated and powerful strikes.",
        "common",
        (player) => longshot(player),
        "assets/images/skills/universal-skills/longshot.webp",
        (player, enemy) => true
    ),
    new Skill(
        "Skill",
        "Bloody Determination",
        "Increases damage by 15% when your HP falls below 25%, turning desperation into power.",
        "common",
        (player) => bloodyDetermination(player),
        "assets/images/skills/universal-skills/bloody-determination.webp",
        (player) => player.health <= player.maxHealth * 0.25
    ),
    new Skill(
        "Skill",
        "Path of Balance",
        "Grants 10% additional attack and defense as long as your HP remains above 75%, maintaining strength while healthy.",
        "common",
        (player) => pathOfBalance(player),
        "assets/images/skills/universal-skills/path-of-balance.webp",
        (player) => player.health >= player.maxHealth * 0.75
    )
];


function longshot(player) {
    player.damage *= 2
    player.attackSpeed *= 0.5
}

function bloodyDetermination(player) {
    if (player.health <= player.maxHealth * 0.25) {
        player.damage *= 1.15; // Erhöht den Schaden um 15%
        console.log(`${player.name} is fueled by Bloody Determination! Damage increased by 15%!`);
    }
}

function pathOfBalance(player) {
    if (player.hp >= (player.maxHealth * 0.75)) {
        player.damage *= 1.1
    }
}

// Fighting System
//Player chooses Class

export function activateSkills(player) {
    playerAvailableSkills.forEach(skill => {
        if (skill.effect) {
            skill.effect(player); // Wendet den Effekt auf den Spieler an
        }
    });
}

// Insert sounds
const monsterAttackSound = new Audio("assets/audio/fast-punch.mp3")
monsterAttackSound.volume = 0.25;
const playerAttackSound = new Audio("assets/audio/soft-kick.mp3")
playerAttackSound.volume = 0.25;

export function fight(player, monster, onFightEnd, onDefeat) {
    console.log(`The battle between ${player.name} and ${monster.name} begins!`);


    let isGameOver = false;

    // Apply all player effects at the start of the fight
    playerAvailableSkills.forEach(skill => {
        if (skill.type === 'skill') {
            skill.applyEffect(player, monster);
        }
    });

    function playerAttackTurn() {
        if (player.health <= 0 || isGameOver) return;

        const playerDamage = player.attack(monster);

        if (!monster.dodge()) {
            monster.takeDamage(playerDamage);
            playerAttackSound.play(); // Play player attack sound
            console.log(`${player.name} hits ${monster.name} for ${playerDamage} damage!`);
        } else {
            console.log(`${monster.name} dodged the attack!`);
        }

        updateHealthDisplay(player, monster);

        if (monster.health <= 0) {
            console.log(`${monster.name} has been defeated!`);
            isGameOver = true;
            onFightEnd();
        } else {
            setTimeout(monsterAttackTurn, monster.attackSpeed);
        }
    }

    function monsterAttackTurn() {
        if (monster.health <= 0 || isGameOver) return;

        const monsterDamage = monster.attack(player);

        if (!player.dodge()) {
            player.takeDamage(monsterDamage);
            monsterAttackSound.play(); // Play monster attack sound
            console.log(`${monster.name} hits ${player.name} for ${monsterDamage} damage!`);
        } else {
            console.log(`${player.name} dodged the attack!`);
        }

        updateHealthDisplay(player, monster);

        if (player.health <= 0) {
            console.log(`${player.name} has been defeated!`);
            isGameOver = true;
            onDefeat();
        } else {
            setTimeout(playerAttackTurn, player.attackSpeed);
        }
    }

    // Start the fight
    setTimeout(playerAttackTurn, player.attackSpeed);
    setTimeout(monsterAttackTurn, monster.attackSpeed);
}


function updateHealthDisplay(player, monster) {
    const playerHealth = document.getElementById("player-hp");
    const monsterHealth = document.getElementById("monster-hp");

    if (playerHealth) {
        playerHealth.textContent = Math.round(player.health);
    }

    if (monsterHealth) {
        monsterHealth.textContent = Math.round(monster.health);
    }
}

export let playerAvailableItems = []

export let playerAvailableFightingStyle = [{
        name: "Aggressive Attacker",
        description: "Increases attack speed by 15%, but reduces defense by 20%, making the character faster but more vulnerable.",
        effect: (player) => {
            player.attackSpeed *= 1.15; // Increases attack speed by 15%
            player.defense *= 0.8; // Reduces defense by 20%
        }
    },
    {
        name: "Defensive Tank",
        description: "Boosts defense by 30%, reducing incoming damage, but lowers attack speed by 25%, making attacks less frequent.",
        effect: (player) => {
            player.defense *= 1.3; // Increases defense by 30%
            player.attackSpeed *= 0.75; // Decreases attack speed by 25%
        }
    },
    {
        name: "Critical Fighter",
        description: "Increases critical hit chance by 50%, allowing for powerful strikes, but lowers attack speed by 20%, resulting in slower attacks.",
        effect: (player) => {
            player.critChance = (player.critChance || 0) * 1.5; // Increases critical hit chance by 50%
            player.attackSpeed *= 0.8; // Reduces attack speed by 20%
        }
    },
    {
        name: "Skillful Dodger",
        description: "Improves dodge chance by 20%, enhancing evasiveness, but decreases physical damage dealt by 15%.",
        effect: (player) => {
            player.dodgeChance = (player.dodgeChance || 0) * 1.2; // Increases dodge chance by 20%
            player.damage *= 0.85; // Reduces physical damage by 15%
        }
    },
    {
        name: "None",
        description: "Remove current Style",
        effect: (player) => player.maxHealth *= 1
    }
];


export let playerAvailableSkills = []