export const SET_SCORE = "Set Score";
export const SET_KEY = "Set Key";
export const FIRE_BULLET = "Fire Bullet";
export const BULLETS_UPDATE = "Bullets Update";
export const DAMAGE_PLAYER = "Damage Player";
export const RESET_PLAYER = "Reset Player";

export const setScore = (payload) => {
    return {
        type: SET_SCORE,
        payload
    }
}

export const setKey = (payload) => {
    return {
        type: SET_KEY,
        payload
    }
}

export const fireBullet = (payload) => {
    return {
        type: FIRE_BULLET,
        payload
    }
}

export const bulletsUpdate = (payload) => {
    return {
        type: BULLETS_UPDATE,
        payload
    }
}

export const damagePlayer = () => {
    return {
        type: DAMAGE_PLAYER
    }
}

export const resetPlayer = () => {
    return {
        type: RESET_PLAYER
    }
}