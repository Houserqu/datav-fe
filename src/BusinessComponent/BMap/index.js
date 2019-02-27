import React, { Component } from 'react';
import { Input, Button, Form } from 'antd';
import style from './style.less';

// import BMap from 'BMap';

const Search = Input.Search;
const FormItem = Form.Item;

class BMapSelector extends Component {
  state = {
    mapData: {},
  };

  map = null;

  componentDidMount() {
    this.initMap();
  }

  initMap = () => {
    const BMap = window.BMap;
    this.map = new BMap.Map('allmap');
    this.map.centerAndZoom(new BMap.Point(116.404, 39.915), 11);
    this.local = new BMap.LocalSearch(this.map, {
      renderOptions: { map: this.map },
    });
    this.map.enableScrollWheelZoom(true);

    const size = new BMap.Size(10, 20);
    this.map.addControl(
      new BMap.CityListControl({
        anchor: window.BMAP_ANCHOR_TOP_LEFT,
        offset: size,
      })
    );
    this.map.addEventListener('click', e => {
      this.setState({
        mapData: {
          ...this.state.mapData,
          longitude: e.point.lng,
          latitude: e.point.lat,
        },
      });
    });

    const geoc = new BMap.Geocoder();

    this.map.addEventListener('click', e => {
      const pt = e.point;
      geoc.getLocation(pt, rs => {
        const addComp = rs.addressComponents;
        let str = '';
        if (addComp.province && addComp.province.indexOf('市')) {
          str = addComp.city + addComp.district + addComp.street + addComp.streetNumber;
        } else {
          str =
            addComp.province +
            addComp.city +
            addComp.district +
            addComp.street +
            addComp.streetNumber;
        }
        this.setState({
          mapData: {
            ...this.state.mapData,
            metAddress: str,
            city: addComp.city,
          },
        });
        // this.mapdata.metAddress = str;
        // this.mapdata.city = addComp.city;
      });
    });
  };

  doSearch = v => {
    if (v) {
      this.local.search(v);
    }
  };

  doSubmit = () => {
    // var this=this;
    // if($("#mettings_add_map_point_choose_form").valid()){
    //     zfesLayerEditDg.setCallBackParam(this.mapdata);
    //    zfesLayerEditDg.close();
    //    }
    //    },
    //    cancel: function(){
    //   layer.close(layer.index);
  };

  handleConfirm = () => {
    this.props.onOk(this.state.mapData);
  };

  render() {
    const { visible, onCancel } = this.props;
    const {
      mapData: { city, metAddress },
    } = this.state;
    return (
      <div style={{ display: visible ? 'flex' : 'none' }} className={style.container}>
        <div id="allmap" style={{ height: 360, width: 500 }} />
        <div className={style.form}>
          <Form>
            <FormItem label="搜索地点">
              <Search placeholder="搜索地点" onSearch={this.doSearch} enterButton />
            </FormItem>

            <FormItem label="城市">
              <Input value={city} disabled />
            </FormItem>

            <FormItem label="地址">
              <Input value={metAddress} disabled />
            </FormItem>

            <FormItem label="">
              <Button type="primary" onClick={this.handleConfirm}>
                确定
              </Button>
              <Button onClick={onCancel} style={{ marginLeft: 20 }}>
                取消
              </Button>
            </FormItem>
          </Form>
        </div>
      </div>
    );
  }
}

export default BMapSelector;
