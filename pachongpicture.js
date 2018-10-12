//var http = require('https');
var http = require('http');
var fs = require('fs');//文件
var cheerio = require('cheerio');
var request = require('request');
//设置循环
var i = 0;
//初始url 
var url = "http://www.27270.com/beautiful/beijingtupian/2018/252979.html"; 
function start(x) {
    console.log('向目标站点发送请求');
    //采用http模块向服务器发起一次get请求      
    http.get(x, function (res) {     
        var html = '';        //用来存储请求网页的整个html内容
        var titles = [];        
        res.setEncoding('utf-8'); //防止中文乱码
        //监听data事件，每次取一块数据
        res.on('data', function (chunk) {   
            html += chunk;
        });
        //监听end事件，如果整个网页内容的html都获取完毕，就执行回调函数
        res.on('end', function () {

         var $ = cheerio.load(html); //采用cheerio模块解析html
         var news_item = {
            //获取图片的标题(jQuery的回传函数)
            title: $('.position strong').text().trim(),
            imgSrc: $('.articleV4Body img').attr('src'),
            link: $(".articleV4Body a").attr('href'),//
            //i是用来判断获取了多少图片
            i: i = i + 1,     
            };
        console.log(news_item);
        var news_title = $('.position strong').text().trim();
        //下一页图片的url
        var nextLink="http://www.27270.com/beautiful/beijingtupian/2018/" + $(".articleV4Body a").attr('href');
        //通过控制i,可以控制爬取多少图片.
        if (i <= 10) {                
            setTimeout(function(){
                start(nextLink);
            },300)
        }
        });
    }).on('error', function (err) {
        console.log(err);
    });

}

start(url);      //主程序开始运行
