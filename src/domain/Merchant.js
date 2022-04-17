import data from "../../data/merchant.json";

function search(area, category, paper_electronic, private_common) {
  var _mi = data;
  var _mo = [];
  var i = 0;
  var j = 0;

  // search area
  if (area != null && area != "ALL") {
    for (i in _mi) {
      if (_mi[i].address.indexOf(area) > -1) {
        _mo.push(_mi[i]);
      }
    }
    _mi = _mo;
  }
  // search category
  if (category != null && category != "ALL") {
    _mo = [];
    i = 0;
    for (i in _mi) {
      if (_mi[i].category == category) {
        _mo.push(_mi[i]);
      }
    }
    _mi = _mo;
  }
  // search paper_electronic
  if (
    paper_electronic != null &&
    paper_electronic != "ALL"
  ) {
    _mo = [];
    i = 0;
    j = 0;
    for (i in _mi) {
      for (j in _mi[i].ticket) {
        if (_mi[i].ticket[j] == paper_electronic) {
          _mo.push(_mi[i]);
        }
      }
    }
    _mi = _mo;
  }
  // search private_common
  if (
    private_common != null &&
    private_common != "ALL"
  ) {
    _mo = [];
    i = 0;
    j = 0;
    for (i in _mi) {
      for (j in _mi[i].ticket) {
        if (_mi[i].ticket[j] == private_common) {
          _mo.push(_mi[i]);
        }
      }
    }
  }
  _mo.position;
  return _mo;
}

export default {
  search,
};