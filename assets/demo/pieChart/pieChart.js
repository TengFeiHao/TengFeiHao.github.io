
    var data = [
        {
            title: '15-20岁',
            num: 12
        },
        {
            title: '20-25岁',
            num: 30
        },
        {
            title: '25-30岁',
            num: 22
        },
        {
            title: '30-35岁',
            num: 10
        },
        {
            title: '35-100岁',
            num: 12
        },
    ];
    var PieChart = function () {
        this.ctx = document.querySelector('canvas').getContext('2d');
        this.width = this.ctx.canvas.width;
        this.height = this.ctx.canvas.height;
        this.x0 = this.width / 2 + 50;
        this.y0 = this.height / 2;
        this.radius = 150;
        this.lineOut = 20;
    }
    PieChart.prototype.init = function (data) {
        this.drawPie(data);
    }
    PieChart.prototype.getRandomColor = function () {
        var r = Math.floor(Math.random() * 256);
        var g = Math.floor(Math.random() * 256);
        var b = Math.floor(Math.random() * 256);
        return 'rgb(' + r + ',' + g + ',' + b + ')';
    }
    PieChart.prototype.transformAngle = function (data) {
        var total = 0
        data.forEach(function (item) {
            total += item.num;
        });
        var canvasData = [];
        data.forEach(function (item) {
            canvasData.push({
                title: item.title,
                num: item.num,
                angle: item.num / total * 2 * Math.PI
            });
        });
        return canvasData;
    }
    PieChart.prototype.drawPie = function (data) {
        var that = this;
        var canvasData = that.transformAngle(data);
        var startAngle = 0;
        canvasData.forEach(function (item,i) {
            that.ctx.beginPath();
            that.ctx.moveTo(that.x0, that.y0);
            that.ctx.arc(that.x0, that.y0, that.radius, startAngle, startAngle + item.angle);
            var color = that.ctx.fillStyle = that.getRandomColor();
            that.ctx.fill();
            that.drawTitle(startAngle, item.angle, color, item.title);
            that.drawDesc(color,i,item.title);
            startAngle = startAngle + item.angle;
        });
    }
    PieChart.prototype.drawTitle = function (startAngle, angle, color, title) {
        var edge = this.radius + this.lineOut;
        var xEdge = Math.cos(startAngle + angle / 2) * edge;
        var yEdge = Math.sin(startAngle + angle / 2) * edge;
        var xOut = this.x0 + xEdge;
        var yOut = this.y0 + yEdge;
        this.ctx.beginPath();
        this.ctx.moveTo(this.x0, this.y0);
        this.ctx.lineTo(xOut, yOut);
        var textWidth = this.ctx.measureText(title).width;
        if (xOut > this.x0) {
            this.ctx.textAlign = 'left';
            this.ctx.lineTo(xOut + textWidth, yOut);
        } else {
            this.ctx.textAlign = 'right';
            this.ctx.lineTo(xOut - textWidth, yOut);
        }
        this.ctx.textBaseline = 'bottom';
        this.ctx.fillText(title,xOut,yOut);
        this.ctx.strokeStyle = color;
        this.ctx.stroke();
    }
    PieChart.prototype.drawDesc = function (color,index,title) {
        this.ctx.beginPath();
        this.ctx.fillStyle = color;
        this.ctx.fillRect(20,20+index*(16+10),30,16);
        this.ctx.textAlign = 'left';
        this.ctx.textBaseline = 'top';
        this.ctx.fillText(title,20+30+10,20+index*(16+10));
    }

    new PieChart().init(data);
