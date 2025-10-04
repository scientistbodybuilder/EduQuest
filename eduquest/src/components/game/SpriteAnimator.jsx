import React, { useState, useEffect, forwardRef, useImperativeHandle  } from 'react'


const SpriteAnimator = forwardRef((props, ref) => {
  const animations = {
    idle: {
      src: "enemy_idle_sheet.png",
      frameCount: 8,
    },
    hurt: {
      src: "enemy_hurt_sheet.png",
      frameCount: 12
    },
    dying: {
      src: "enemy_dying_sheet.png",
      frameCount: 12
    },
    dead: {
      src: "enemy_dead_sheet.png",
      frameCount: 1
    },
    attack: {
      src: "enemy_attack_sheet.png",
      frameCount: 12
    }
  }
  const [frame, setFrame] = useState(0);
  const [currentAnimation, setCurrentAnimation] = useState('idle')
  // console.log('the current animation is: ',currentAnimation)
  // console.log('sheet: ',animations[currentAnimation])

  // useEffect(() => {
  //   setCurrentAnimation(animation)
  // }, [animation])
  const updateAnimation = (ani) => {
    console.log('update animation called')
    setCurrentAnimation(ani)
    setFrame(0)
  }

  useImperativeHandle(ref, () => ({
    updateAnimation,
  }));


  useEffect(() => {
    const interval = setInterval(() => {
      // setFrame((prev) => (prev + 1) % frameCount);
      setFrame((prev) => {
      const next = (prev + 1) % animations[currentAnimation].frameCount;
      
      if (currentAnimation === "hurt" && prev === animations[currentAnimation].frameCount - 1) {
        // Finished hurt animation
        setCurrentAnimation("idle");
        return 0; // reset frame
      }
      else if (currentAnimation === "attack" && prev === animations[currentAnimation].frameCount - 1) {
        setCurrentAnimation("idle")
        return 0
      }
      else if (currentAnimation == "dying" && prev === animations[currentAnimation].frameCount - 1) {
        setCurrentAnimation("dead")
        return 0;
      }
      
      return next;
    });
    }, 1000 / props.fps);
    
    return () => clearInterval(interval);
  }, [props.fps, currentAnimation]);

  return (
    <div
      style={{
        width: props.displayWidth,
        height: props.displayHeight,
        backgroundImage: `url(${animations[currentAnimation].src})`,
        backgroundPosition: `-${frame * props.displayWidth}px 0px`,
        backgroundRepeat: "no-repeat",
        backgroundSize: `${animations[currentAnimation].frameCount * props.displayWidth}px ${1 * props.displayHeight}px`,
      }}
    />
  );
});

export default SpriteAnimator

// { 
//   src, 
//   frameWidth = 900, 
//   frameHeight = 900, 
//   frameCount, 
//   fps, 
//   displayWidth = frameWidth, 
//   displayHeight = frameHeight,
//   animation 
// }