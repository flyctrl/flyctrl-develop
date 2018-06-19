/**
 * Created by grycheng
 */
//HTML 输入的box
/*
* x  水平方向位置
* y  水平方向位置
* width box 的width
* height box 的height
* style json(option)*/
function HtmlTextBox(game,x,y,width,height,text,style)
{
    Phaser.Group.call(this,game);

    this.game = game;
    this.parentElement = game.canvas.parentNode;

    //创建一个inputElement
    this.textBoxElement = document.createElement('input');
    this.textBoxElement.style.position = 'absolute';
    this.textBoxElement.style.left = x+'px';
    this.textBoxElement.style.top = y+'px';
    this.textBoxElement.style.width = width;
    this.textBoxElement.style.height = height;
    this.parentElement.insertBefore(this.textBoxElement,game.canvas);

    this._x = x;
    this._y = y;
    this._width = width;
    this._height = height;
    this._style = style;

    this.text = text;
    if(style != 'undefined')
    {
        this.style = style;
    }
    game.add.existing(this);
    this.onDestroy.add(function(group)
    {
        //删除界面上的Element
        this.parentElement.removeChild(this.textBoxElement);
    },this);
    this.update();

}

HtmlTextBox.prototype = Object.create(Phaser.Group.prototype);
HtmlTextBox.prototype.constructor = HtmlTextBox;
//更新函数，用来重新计算TextBox的位置
HtmlTextBox.prototype.update  = function()
{
    var canvas = this.game.canvas;


    var canvasX = canvas.offsetLeft;
    var canvasY =  canvas.offsetTop;
    var canvasWidth = canvas.offsetWidth;
    var canvasHeight = canvas.offsetHeight;

    if(this.oldCanvasWidth == canvasWidth && this.oldCanvasHeight == canvasHeight
        && this.oldCanvasX == canvasX && this.oldCanvasY == canvasY)return;

    var gameWidth = this.game.world.width;
    var gameHeight = this.game.world.height;

    var widthScanle = canvasWidth/gameWidth;
    var heightScanle = canvasHeight/gameHeight;

    var xScanle = this._x/gameWidth;
    var yScanle = this._y/gameHeight;

    var newX = canvasX + canvasWidth * xScanle;
    var newY = canvasY + canvasHeight * yScanle;
    var newWidth = this._width * widthScanle;
    var newHeight = this._height * heightScanle;

    this.setX(newX);
    this.setY(newY);
    this.setWidth(newWidth);
    this.setHeight(newHeight);
    this.oldCanvasWidth = canvasWidth;
    this.oldCanvasHeight = canvasHeight;
    this.oldCanvasX = canvasX;
    this.oldCanvasY = canvasY;
}

//设置位置X
HtmlTextBox.prototype.setX = function(x)
{
    this.textBoxElement.style.left = x+'px';
}
//设置位置Y
HtmlTextBox.prototype.setY = function(y)
{
    this.textBoxElement.style.top = y+'px';
}

//设置width
HtmlTextBox.prototype.setWidth = function(width)
{
    this.textBoxElement.style.width = width+'px';
}
//设置height
HtmlTextBox.prototype.setHeight = function(height)
{
    this.textBoxElement.style.height = height+'px';
}

//设置style
HtmlTextBox.prototype.setStyle = function(style)
{
    this.textBoxElement.style = style;
}

//使用属性的方式操作X
Object.defineProperty(HtmlTextBox.prototype,'x',
    {
        get:function()
        {
            return this._x;
        },
        set:function(value)
        {
            this.setX(value);
            this._x = value;
        }
    });
//使用属性的方式操作Y
Object.defineProperty(HtmlTextBox.prototype,'y',
    {
        get:function()
        {
            return this._y;
        },
        set:function(value)
        {
            this.setY(value);
            this._y = value;
        }
    });

//使用属性的方式操作width
Object.defineProperty(HtmlTextBox.prototype,'width',
    {
        get:function()
        {
            return this._width;
        },
        set:function(value)
        {
            this.setWidth(value);
            this._width = value;
        }
    });

//使用属性的方式操作height
Object.defineProperty(HtmlTextBox.prototype,'height',
    {
        get:function()
        {
            return this._height;
        },
        set:function(value)
        {
            this.setHeight(value);
            this._height = value;
        }
    });

//使用属性的方式操作style
Object.defineProperty(HtmlTextBox.prototype,'style',
    {
        get:function()
        {
            return this._style;
        },
        set:function(value)
        {
            for(var key in value)
            {
                this.textBoxElement.style[key] = value[key];
            }
            this._style = value;
        }
    });

//设置字体
Object.defineProperty(HtmlTextBox.prototype,'text',
    {
        get:function()
        {
            return this._text;
        },
        set:function(value)
        {
            this.textBoxElement.value = value;
            this._text = value;
        }
    });

