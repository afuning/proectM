/**
 * Created by huning on 16/2/23.
 */
;(function($,win){
    var main = {
        init: function(){
            this.addEvent();
            this.createChart();
            this.getDate();
            this.year = moment().years();
            this.month = moment().months();

            $('#screen_month option').eq(this.month).prop("selected",'selected');
            $('#screen_year option').eq(0).prop("selected",'selected');
        },


        addEvent: function() {
            var self = this;
            $('#screen_month').on('change',function(){
                self.month= $(this).children('option:selected').val();
            });

            $('#screen_year').on('change',function(){
                self.year= $(this).children('option:selected').text();
            });

            $('.screen_submit').on('click',function(){
                self.getDate();
            })
        },

        getDate: function(){
            var self = this;
            if(self.isGet) return;
            self.isGet = true;
            lib.api.get({
                api:'/count/bug/month',
                data: {
                    year: self.year,
                    month: self.month
                },
                success: function(data){
                    var newBug  = data.data.new_bug;
                    var done  = data.data.done;
                    var total = data.data.total;
                    var time = moment().set({'year': self.year, 'month': self.month});
                    if(self.year == moment().year() && self.month == moment().month()){
                        self.newBug = new Array(moment().date()).fill(0);
                        self.done = new Array(moment().date()).fill(0);
                        self.total = new Array(moment().date()).fill(0);
                    }else if(self.year < moment().year() || (self.month < moment().month()&&self.year == moment().year())){
                        self.newBug = new Array(time.daysInMonth()).fill(0);
                        self.done = new Array(time.daysInMonth()).fill(0);
                        self.total = new Array(time.daysInMonth()).fill(0);
                    }else{
                        self.newBug = new Array(1).fill(0);
                        self.done = new Array(1).fill(0);
                        self.total = new Array(1).fill(0);
                        self.updateChart();
                        return;
                    }
                    newBug.forEach(function(item,i){
                        var time=moment(item.createTime).date();
                        self.newBug[time-1]++;
                    });
                    done.forEach(function(item,i){
                        var time=moment(item.endTime).date();
                        self.done[time-1]++;
                    });

                    total.forEach(function(item,i){
                        var time=moment(item.createTime).date();
                        for(var j = self.total.length;j>=time;j--){
                            self.total[j-1]++;
                        }
                    });
                    self.updateChart();
                },
                error: function(err){
                    console.log(err);
                    //lib.notification.simple(err.msg,{bg:'#e15f63',font:'#fff'},2000);
                },
                complete: function(){
                    self.isGet= false
                }
            })
        },

        updateChart: function(){
            var newbug = this.newBug;
            var done = this.done;
            var total = this.total;
            var day = [];
            var  self = this;
            var time = moment().set({'year': self.year, 'month': self.month}).daysInMonth();
            for(var i =1;i<=time;i++){
                day.push(i+'日');
            }
            this.bugChart.data.labels = day;
            this.bugChart.data.datasets[0].data =newbug;
            this.bugChart.data.datasets[1].data =done;
            this.bugChart.data.datasets[2].data =total;
            this.bugChart.update();
        },

        createChart: function(){
            var chart = $('#bugChart');
            var day = [];
            var  self = this;
            var time = moment().set({'year': self.year, 'month': self.month}).daysInMonth();
            for(var i =1;i<=time;i++){
                day.push(i+'日');
            }
            this.bugChart = new Chart(chart, {
                type: 'line',
                data: {
                    labels: day,
                    datasets: [
                        {
                            label: "新增BUG",
                            fill: false,
                            lineTension: 0.1,
                            backgroundColor: "rgba(255,99,132,0.4)",
                            borderColor: "rgba(255,99,132,1)",
                            borderCapStyle: 'butt',
                            borderDash: [],
                            borderDashOffset: 0.0,
                            borderJoinStyle: 'miter',
                            pointBorderColor: "rgba(255,99,132,1)",
                            pointBackgroundColor: "#fff",
                            pointBorderWidth: 1,
                            pointHoverRadius: 5,
                            pointHoverBackgroundColor: "rgba(255,99,132,1)",
                            pointHoverBorderColor: "rgba(220,220,220,1)",
                            pointHoverBorderWidth: 2,
                            pointRadius: 1,
                            pointHitRadius: 10,
                            data: [0],
                        },
                        {
                            label: "新增解决BUG",
                            fill: false,
                            lineTension: 0.1,
                            backgroundColor: "rgba(75,192,192,0.4)",
                            borderColor: "rgba(75,192,192,1)",
                            borderCapStyle: 'butt',
                            borderDash: [],
                            borderDashOffset: 0.0,
                            borderJoinStyle: 'miter',
                            pointBorderColor: "rgba(75,192,192,1)",
                            pointBackgroundColor: "#fff",
                            pointBorderWidth: 1,
                            pointHoverRadius: 5,
                            pointHoverBackgroundColor: "rgba(75,192,192,1)",
                            pointHoverBorderColor: "rgba(220,220,220,1)",
                            pointHoverBorderWidth: 2,
                            pointRadius: 1,
                            pointHitRadius: 10,
                            data: [0],
                        },
                        {
                            label: "未解决BUG",
                            fill: false,
                            lineTension: 0.1,
                            backgroundColor: "rgba(179,181,198,0.4)",
                            borderColor: "rgba(179,181,198,1)",
                            borderCapStyle: 'butt',
                            borderDash: [],
                            borderDashOffset: 0.0,
                            borderJoinStyle: 'miter',
                            pointBorderColor: "rgba(179,181,198,1)",
                            pointBackgroundColor: "#fff",
                            pointBorderWidth: 1,
                            pointHoverRadius: 5,
                            pointHoverBackgroundColor: "rgba(179,181,198,1)",
                            pointHoverBorderColor: "rgba(220,220,220,1)",
                            pointHoverBorderWidth: 2,
                            pointRadius: 1,
                            pointHitRadius: 10,
                            data: [0],
                        }
                    ]
                }
            });
            this.bugChart.update();
        }
    }

    $(function(){
        main.init();
    })
})(jQuery,window)