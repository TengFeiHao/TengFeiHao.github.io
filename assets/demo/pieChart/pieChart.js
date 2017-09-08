
    /*׼������*/
    var data = [
        {
            title: '15-20��',
            num: 12
        },
        {
            title: '20-25��',
            num: 30
        },
        {
            title: '25-30��',
            num: 22
        },
        {
            title: '30-35��',
            num: 10
        },
        {
            title: '35-100��',
            num: 12
        },
    ];
    /*�������캯��*/
    var PieChart = function () {
        /*����*/
        this.ctx = document.querySelector('canvas').getContext('2d');
        /*�����ߴ�*/
        this.width = this.ctx.canvas.width;
        this.height = this.ctx.canvas.height;
        /*����Բ�����ĵ�*/
        this.x0 = this.width / 2 + 50;
        this.y0 = this.height / 2;
        /*����Բ�뾶*/
        this.radius = 150;
        /*�������߳���*/
        this.lineOut = 20;
    }
    PieChart.prototype.init = function (data) {
        this.drawPie(data);
    }
    /*��ȡ������ɫ*/
    PieChart.prototype.getRandomColor = function () {
        var r = Math.floor(Math.random() * 256);
        var g = Math.floor(Math.random() * 256);
        var b = Math.floor(Math.random() * 256);
        return 'rgb(' + r + ',' + g + ',' + b + ')';
    }
    /*ת������*/
    PieChart.prototype.transformAngle = function (data) {
        /*ת��������һ���������ȵ�������*/
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
    /*���Ʊ�ͼ����*/
    PieChart.prototype.drawPie = function (data) {
        var that = this;
        var canvasData = that.transformAngle(data);
        /*�����µ�����*/
        var startAngle = 0;
        canvasData.forEach(function (item,i) {
            /*���Ƶ�����*/
            that.ctx.beginPath();
            that.ctx.moveTo(that.x0, that.y0);
            that.ctx.arc(that.x0, that.y0, that.radius, startAngle, startAngle + item.angle);
            //that.ctx.strokeStyle = that.ctx.fillStyle = that.getRandomColor();
            var color = that.ctx.fillStyle = that.getRandomColor();
            that.ctx.fill();
            /*���б����Ļ���*/
            that.drawTitle(startAngle, item.angle, color, item.title);
            /*����˵���Ļ���*/
            that.drawDesc(color,i,item.title);
            /*��¼��ǰ�Ľ���λ��  ��һ�ε���ʼλ��*/
            startAngle = startAngle + item.angle;
        });
    }
    /*�����Ļ���*/
    PieChart.prototype.drawTitle = function (startAngle, angle, color, title) {
        /*���Ʊ�����Ҫʲô��*/
        /*��ʱ��ȥ�ĵ�����*/
        /*��Ҫб�ߵĳ���*/
        /*��Ҫ����*/
        var edge = this.radius + this.lineOut;
        /*x�᷽��ƫ��*/
        var xEdge = Math.cos(startAngle + angle / 2) * edge;
        /*y�᷽��ƫ��*/
        var yEdge = Math.sin(startAngle + angle / 2) * edge;
        /*��������������*/
        var xOut = this.x0 + xEdge;
        var yOut = this.y0 + yEdge;
        /*�ƶ�������*/
        /*��һ���ߵ�������*/
        this.ctx.beginPath();
        this.ctx.moveTo(this.x0, this.y0);
        this.ctx.lineTo(xOut, yOut);
        /*���ƺ���*/
        /*���߳���*/
        var textWidth = this.ctx.measureText(title).width;
        if (xOut > this.x0) {
            /*�ұ�*/
            this.ctx.textAlign = 'left';
            this.ctx.lineTo(xOut + textWidth, yOut);
        } else {
            /*����*/
            this.ctx.textAlign = 'right';
            this.ctx.lineTo(xOut - textWidth, yOut);
        }
        /*��������*/
        this.ctx.textBaseline = 'bottom';
        this.ctx.fillText(title,xOut,yOut);
        this.ctx.strokeStyle = color;
        this.ctx.stroke();
    }
    /*˵���Ļ���*/
    PieChart.prototype.drawDesc = function (color,index,title) {
        this.ctx.beginPath();
        this.ctx.fillStyle = color;
        this.ctx.fillRect(20,20+index*(16+10),30,16);
        this.ctx.textAlign = 'left';
        this.ctx.textBaseline = 'top';
        this.ctx.fillText(title,20+30+10,20+index*(16+10));
    }

    /*��ʼ��*/
    new PieChart().init(data);
