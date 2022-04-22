input.onButtonPressed(Button.A, function () {
    bird.change(LedSpriteProperty.Y, -1)
})
input.onButtonPressed(Button.B, function () {
    bird.change(LedSpriteProperty.Y, 1)
})
let emptyObstacleY = 0
let bird: game.LedSprite = null
let index = 0
let obstacles: game.LedSprite[] = []
bird = game.createSprite(0, 2)
let ticks = 0
let hard = 3
bird.set(LedSpriteProperty.Blink, 300)
game.setScore(0)
basic.forever(function () {
    while (obstacles.length > 0 && obstacles[0].get(LedSpriteProperty.X) == 0) {
        obstacles.removeAt(0).delete()
    }
    for (let obstacle2 of obstacles) {
        obstacle2.change(LedSpriteProperty.X, -1)
    }
    if (ticks % hard == 0) {
        emptyObstacleY = randint(0, 4)
        for (let index2 = 0; index2 <= 4; index2++) {
            if (index2 != emptyObstacleY) {
                obstacles.push(game.createSprite(4, index2))
            }
        }
        music.playTone(262, music.beat(BeatFraction.Quarter))
    }
    for (let obstacle3 of obstacles) {
        if (obstacle3.get(LedSpriteProperty.X) == bird.get(LedSpriteProperty.X) && obstacle3.get(LedSpriteProperty.Y) == bird.get(LedSpriteProperty.Y)) {
            soundExpression.mysterious.play()
            game.gameOver()
        }
    }
    ticks += 1
    game.setScore(Math.floor(ticks / 3))
    if (ticks >= 60) {
        basic.pause(500)
    } else if (ticks >= 40) {
        basic.pause(750)
        hard = 2
    } else if (ticks >= 20) {
        basic.pause(1000)
    } else {
        basic.pause(1250)
    }
})
