import React, { Component } from 'react';
import Slider from 'react-slick';

import Title from './Title';
import Slide from './Slide/Slide';

// noinspection EqualityComparisonWithCoercionJS
const isNumeric = (val) => Number(parseFloat(val)) == val;

function stripMargin(template, ...expressions) {
  let result = template.reduce((accumulator, part, i) => {
    return accumulator + expressions[i - 1] + part;
  });

  return result.replace(/\r?(\n)\s*\|/g, '$1').trim();
}

export default class App extends Component {
  constructor(props) {
    super(props);
    this.focusSlider = this.focusSlider.bind(this);
  }

  focusSlider() {
    this.slider.innerSlider.list.focus();
  }

  componentDidMount() {
    this.slider.innerSlider.list.setAttribute('tabindex', 0);
    this.focusSlider();
  }

  render() {
    let settings = {
      accessibility: true,
      arrows: true,
      adaptiveHeight: true,
    };

    let defaultQuery = 's=e-6m&w=1000&tz=US/Central';

    return (
      <div className="container-fluid">
        <Slider ref={slider => {
          this.slider = slider;
        }} {...settings}>
          <div><Title /></div>
          <div>
            <Slide
              title="Timer Latency"
              stackLang={
                stripMargin`
                |name,httpServerRequests,:eq,:dist-avg,
                |  throughput,:legend
              `
              }
              queryParams={defaultQuery} />
          </div>
          <div>
            <Slide
              title="Cache Monitoring"
              stackLang="name,controllerCacheRequests,:eq,(,result,),:by,:stack"
              queryParams={defaultQuery}
            />
          </div>
          <div>
            <Slide
              title="Multi-Y"
              stackLang={
                stripMargin`
                |name,httpServerRequests,:eq,:dist-avg,
                |  throughput,:legend,
                |name,httpServerRequests,:eq,
                |  statistic,count,:eq,
                |  :and,
                |  1,:axis,
                |  latency,:legend
              `
              }
              queryParams={defaultQuery} />
          </div>
          <div>
            <Slide
              title="Stacking"
              stackLang={
                stripMargin`
                |name,httpServerRequests,:eq,status,2.+,:reic,:and,(,status,),:by,4daf4a,:color,
                |name,httpServerRequests,:eq,status,[34].+,:reic,:and,(,status,),:by,ffeda0,:color,
                |name,httpServerRequests,:eq,status,5.+,:reic,:and,(,status,),:by,e41a1c,:color
                `
              }
              queryParams="s=e-30m&w=1000&stack=1"
            />
          </div>
          <div>
            <Slide
              title="Aggregable Percentiles"
              stackLang={
                stripMargin`
                |name,httpServerRequests,:eq,
                | (,50,90,95,),:percentiles,
                |name,httpServerRequests,:eq,:dist-avg,
                | distribution+average,:legend,
                | 1,:axis,
                | 2,:lw
                `
              }
              queryParams="s=e-10m&w=1000&tz=US/Central&palette.0=reds"
            />
          </div>
          <div>
            <Slide
              title="Fixed Threshold Alerting"
              stackLang={
                stripMargin`
                |name,httpServerRequests,:eq,:dup,
                |300,:lt,
                |:vspan,
                |40,:alpha,
                |trigger,:legend,
                |:rot,throughput,:legend,:rot
                `
              }
              queryParams="s=e-10m&w=1000&tz=US/Central&l=0"
            />
          </div>
          <div>
            <Slide
              title="Double Exponential Smoothing"
              stackLang={
                stripMargin`
                |name,httpServerRequests,:eq,
                |:dup,
                |:des-fast,0.85,:mul,
                |:2over,
                |:lt,
                |:vspan,40,:alpha
                `
              }
              queryParams="s=e-10m&w=1000&tz=US/Central&l=0"
            />
          </div>
        </Slider>
      </div>
    );
  }
}
