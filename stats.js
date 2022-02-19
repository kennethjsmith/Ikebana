class PlayerStats {
    constructor( health, hurt, hurtTimeout, hurtTimer, dead, dyingTimeout, dyingTimer, damageDealt) {
        Object.assign(this, { health, hurt, hurtTimeout, hurtTimer, dead, dyingTimeout, dyingTimer, damageDealt });
    };
}

class EnemyStats {
    constructor(speed, health, hurt, hurtTimeout, hurtTimer, dead, deadTimeout, deadTimer, damageDealt, attackTimeout, attackTimer) {
        Object.assign(this, { speed, health, hurt, hurtTimeout, hurtTimer, dead, deadTimeout, deadTimer, damageDealt, attackTimeout, attackTimer });
    };
}

class LevelStats {
    constructor(label, totalEnemies, deadEnemyCount) {
        Object.assign(this, { label, totalEnemies, deadEnemyCount });
    };
}