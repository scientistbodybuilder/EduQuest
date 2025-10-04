import Reaact, { useState, useEffect } from 'react'
import SpriteAnimator from '../SpriteAnimator'

const EnemyIdle  = (props) => {

    return(
        <SpriteAnimator 
            src="enemy_idle_sheet.png"
            frameHeight={900}
            frameWidth={900}
            frameCount={4}
            displayHeight={props.height}
            displayWidth={props.width}
            fps={8}
            animation={props.animation}
        
        />
    )
}

export default EnemyIdle