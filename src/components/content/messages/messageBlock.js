import { Component } from "../../../core/Component";

const errorBlock = new Component('messageBlock');

errorBlock.createBody(`<div class="align-self-center alert alert-success text-center">%message%</div>`);