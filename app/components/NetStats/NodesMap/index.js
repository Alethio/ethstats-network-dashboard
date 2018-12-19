import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as d3 from 'd3';
import {event as currentEvent} from 'd3';
import Datamap from './datamap';
const radius = 4;

class NodesMap extends React.Component {
  render() {
    const { nodesData } = this.props;
    // dataToSave['ethstats:nodeData']['geo:point'];
    let bubblesData = [];
    if (nodesData) {
      bubblesData = Object.keys(nodesData).reduce((accumulator, nodeKey) => {
        const geo = nodesData[nodeKey]['ethstats:nodeData'] && nodesData[nodeKey]['ethstats:nodeData']['geo:point'];
        const isOnline = nodesData[nodeKey]['ethstats:nodeData'] && nodesData[nodeKey]['ethstats:nodeData']['ethstats:nodeIsActive'];
        const nodeName =  nodesData[nodeKey]['ethstats:nodeData'] && nodesData[nodeKey]['ethstats:nodeData']['ethstats:nodeName'];
        if (geo && nodeName) {
          accumulator.push({
            name: nodeName,
            radius,
            latitude: geo.split(' ')[0],
            longitude: geo.split(' ')[1],
            fillKey: (!isOnline) ? 'offlineBubbleFill' : 'bubbleFill',
          });
        }
        return accumulator;
      }, []);
    }
    return (
      <Datamap
        geographyConfig={{
          popupOnHover: false,
          highlightOnHover: false,
          borderColor: '#182231',
        }
        }
        fills={{
          defaultFill: '#182231',
          bubbleFill: '#50E9D2',
          offlineBubbleFill: '#EF6C6C',
        }}
        bubbles={bubblesData
        }
        bubbleOptions={{
          borderWidth: 0,
          borderColor: '#ABCDEF',
          fillOpacity: 0.6,
          popupTemplate: (geography, data) => { // This function should just return a string
            return '<div class="hoverinfo" style="border: none; text-align: left; padding: 6px 10px; box-shadow: 0 2px 30px 0 rgba(0,0,0,0.40); border-radius: 4px; color: white; background-color: #324156;">' + data.name + '</div>';
          },
        }}
        done={ (datamap) => {
          let ev;

          let zoomListener = d3.behavior.zoom()
            .size([250, 130])
            .scaleExtent([1, 3])
            .on('zoom', redraw)
            .on('zoomend', animadraw);

          function redraw() {
            d3.select('.datamaps-subunits').attr('transform', 'translate(' + currentEvent.translate + ')scale(' + currentEvent.scale + ')');
            d3.select('.bubbles').selectAll('circle')
              .attr('transform', 'translate(' + currentEvent.translate + ')scale(' + currentEvent.scale + ')');

            ev = currentEvent;
          }

          zoomListener(datamap.svg);

          function animadraw() {
            let x = Math.min(0, Math.max(ev.translate[0], (-1) * 250 * (ev.scale - 1)));
            let y = Math.min(0, Math.max(ev.translate[1], (-1) * 130 * (ev.scale - 1)));

            d3.select('.datamaps-subunits')
              .transition()
              .delay(150)
              .duration(750)
              .attr('transform', 'translate(' + x + ',' + y + ')scale(' + ev.scale + ')');

            d3.select('.bubbles').selectAll('circle')
              .transition()
              .delay(150)
              .duration(750)
              .attr('transform', 'translate(' + x + ',' + y + ')scale(' + ev.scale + ')');

            zoomListener.translate([x, y]);
          }
        }
        }
      />
    );
  }
}

NodesMap.propTypes = {
  nodes: PropTypes.array,
  nodesData: PropTypes.object,
  // version: PropTypes.any,
};

const mapStateToProps = (state) => {
  return {
    nodes: state.nodesList.data,
    nodesData: state.nodesData.data,
    // version: state.nodesList.version,
  };
};

export default connect(
  mapStateToProps,
  null
)(NodesMap);
