import Reaact, { useState, useEffect } from 'react'
import SpriteAnimator from '../SpriteAnimator'

const EnemyHurt  = (props) => {

    return(
        <SpriteAnimator 
            src="enemy_hurt_sheet.png"
            frameHeight={900}
            frameWidth={900}
            frameCount={12}
            displayHeight={props.height}
            displayWidth={props.width}
            fps={8}
        
        />
    )
}

export default EnemyHurt