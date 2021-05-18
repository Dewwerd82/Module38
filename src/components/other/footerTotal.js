import { Component } from "../../core/Component";

const footerTotal = new Component('footerTotal');

footerTotal.createBody(`Active tasks: %ready%, Finished tasks: %finished%`);