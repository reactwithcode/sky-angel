export const ADD_ENEMY = "Add Enemy";
export const UPDATE_ENEMIES = "Update Enemies";
export const UPDATE_GENERATION = "Update Generation";
export const RESET_ENEMIES = "Reset Enemies";

export const addEnemy = (payload) => {
    return {
        type: ADD_ENEMY,
        payload
    }
}

export const updateEnemies = (payload) => {
    return {
        type: UPDATE_ENEMIES,
        payload
    }
}

export const updateGeneration = (payload) => {
    return {
        type: UPDATE_GENERATION,
        payload
    }
}

export const resetEnemies = () => {
    return {
        type: RESET_ENEMIES
    }
}