# Project: Sprite Canvas Library
The goal is to make a libray that facilitates working with canvas. 

## Background 
Canvas is a low level API that allows us to draw objects into a map region on the screen. The problem is it lacks abstraction. The canvas API requires that you draw every shape manually. An improvement would an abstraction that allows us to define objects that can be positioned on the screen that know how to draw themselves. 

You did some of this in ACS 1320. This project takes those ideas a few steps further. 

## Class Sprite
The Sprite class defines object that can draw a rectangle on the screen at an x and y coordinate. 

Sprite Objects have the following properties: 
- `x` - the horizontal position of a sprite on the canvas. 
- `y` - the vertical position of a sprite on the canvas.
- `width` - the width of a sprite. 
- `height` - the height of a sprite.
- `rotation` - the rotation of a sprite. 
- `color` - the fill color of a sprite. If this property is `undefined` the fill color is not drawn.
- `stroke` - the width of a stroke around the sprite. If this property is `0` the stroke is not drawn. 
- `strokeColor` - the color of the stroke.
- `image` - This property should be the string path to an image. If the property is not `undefined` the sprite draws the image within its rectangle. 

All of these properties should be able to be set in the constructor when creating a sprite instance. 

Sprite Objects have the following methods:
- `render(ctx)` - this method draws the sprite into the canvas. The method takes a canvas context as a parameter. 

## SpriteManager Class
This class holds an array of Sprite Objects and has the job of drawing these. 

This class should be initialized with the id of a canvas object. 

SpriteManager methods: 
- `addSprite(sprite)` - Adds a sprite to the list to render.
- `update()` - renders all sprites in the list.
- `start()` - starts rendering sprites using `requestAnimationFrame()`

## Test app
Your submitted homework should inlcude a test app that shows your code in action. The test should import your code to a react Project with npm. Your test app does not have to be complex, the goal is to show your library functioning in context, not creating complex comercial project. 

## Evaluation
| Category | Points |
|:---------|:-------|
| Code & function | 10 |
| Uses Typescript |  5 |
| Has Unit Tests  |  5 |
| Test App        |  5 |
| Uses Bundling   |  5 |
| Uses CI         |  5 |
| Total           | 35 |