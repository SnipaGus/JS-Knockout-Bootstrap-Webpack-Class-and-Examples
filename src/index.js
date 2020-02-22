import _ from 'lodash';
import ko from 'knockout';
import './style.css';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from "jquery";
import data from '../data/pageData.json';

var Page = function (textArray, image) {
    var self = this;
    this.text = ko.observableArray(textArray);
    this.image = ko.observable(image || null);
    return self;
}

var jsonData = function (data) {
    var self = this;
    this.pages = ko.observableArray();
    for (var i = 0; i < data.length; i++) {
        this.pages.push(new Page(data[i].textArray, data[i].image));
    }
    return self;
}

var ViewModel = function() {
    var self = this;
    var vmRef = self;
    this.jsonData = new jsonData(data);
    this.activePage = ko.observable(this.jsonData.pages()[0]);
};

ko.applyBindings(new ViewModel(), document.getElementById('root'));