import { Component } from "../../../core/Component";

const errorBlock = new Component('errorBlock');

errorBlock.createBody(`<div class="align-self-center alert alert-danger text-center">%error%</div>`);