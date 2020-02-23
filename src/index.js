import _ from 'lodash';
import ko from 'knockout';
import './style.css';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import image1 from "../dist/images/javascript.jpg";
import image2 from '../dist/images/triangle.png';
import image3 from '../dist/images/html.png';
import image4 from '../dist/images/css.png';
import image5 from '../dist/images/knockout1.png';
import image6 from '../dist/images/knockout2.png';
import image7 from '../dist/images/knockout3.png';
import image8 from '../dist/images/bootstrap1.png';
import image9 from '../dist/images/bootstrap2.png';
import image10 from '../dist/images/bootstrap3.png';
import image11 from "../dist/images/bootstrap4.png";
import image12 from '../dist/images/webpack1.png';
import image13 from '../dist/images/webpack2.png';
import image14 from '../dist/images/questions.jpg';
import image15 from '../dist/images/elite.jpg';
import $ from "jquery";
import data from '../data/pageData.json';

function imageSelect(imageTag) {
    var image = null;
    switch(imageTag){
        case "image1":
            image = image1;
            break;
        case "image2":
            image = image2;
            break;
        case "image3":
            image = image3;
            break;
        case "image4":
            image = image4;
            break;
        case "image5":
            image = image5;
            break;  
        case "image6":
            image = image6;
            break;
        case "image7":
            image = image7;
            break;
        case "image8":
            image = image8;
            break;
        case "image9":
            image = image9;
            break;
        case "image10":
            image = image10;
            break;
        case "image11":
            image = image11;
            break;
        case "image12":
            image = image12;
            break;
        case "image13":
            image = image13;
            break;
        case "image14":
            image = image14;
            break;
        case "image15":
            image = image15;
            break;
    }
    return image;
}

var Page = function (title, textArray, image) {
    var self = this;
    this.title = ko.observable(title)
    this.text = ko.observableArray();
    for (var i = 0; i < textArray.length; i++) {
        this.text.push(textArray[i]);
    }
    this.image = ko.observable(image || null);
    if (this.image()) {
        var imageElement = $('#top-image');
        imageElement.attr("src", imageSelect(this.image()));
    }
    return self;
}

var jsonData = function (data) {
    var self = this;
    this.pages = ko.observableArray();
    for (var i = 0; i < data.length; i++) {
        this.pages.push(new Page(data[i].title, data[i].textArray, data[i].image));
    }
    return self;
}

var ViewModel = function() {
    var self = this;
    var vmRef = self;
    this.jsonData = new jsonData(data);
    this.currentIndex = 0;
    this.pageCount = this.jsonData.pages().length;
    this.activePage = ko.observable(this.jsonData.pages()[this.currentIndex]);
    document.addEventListener('keydown', function(event) {
        if(event.keyCode == 37) {
            if (vmRef.currentIndex >= 1) {
                vmRef.currentIndex--;
                vmRef.activePage(vmRef.jsonData.pages()[vmRef.currentIndex])
            }
        }
        else if(event.keyCode == 39) {
            if (vmRef.currentIndex < vmRef.pageCount - 1) {
                vmRef.currentIndex++;
                vmRef.activePage(vmRef.jsonData.pages()[vmRef.currentIndex])
            } else {
                alert("Reached end of presentation.")
            }
        }
    });
    this.activePage.subscribe(function(){
        var imageElement = $('#top-image');
        if (self.activePage().image()) {
            imageElement.attr("src", imageSelect(self.activePage().image()));
        } else {
            imageElement.attr('src', null);
        }
        return self;
    });
    this.activePage(this.jsonData.pages()[0]);
};



ko.applyBindings(new ViewModel(), document.getElementById('root'));
