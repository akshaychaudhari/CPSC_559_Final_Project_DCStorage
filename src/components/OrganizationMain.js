import React, { Component } from 'react';
import { convertBytes } from './helpers';
import moment from 'moment';
import './OrganizationMain.css';
import './OrganizationMainVanilla';

class OrganizationMain extends Component {

  componentDidMount(){
    const range = document.getElementById('range');

    range.addEventListener('input', (e) => {
    const value = +e.target.value;
    const label = e.target.nextElementSibling;

    const range_width = getComputedStyle(e.target).getPropertyValue('width');
    const label_width = getComputedStyle(label).getPropertyValue('width');

    const num_width = +range_width.substring(0, range_width.length - 2);
    const num_label_width = +label_width.substring(0, label_width.length - 2);

    const max = +e.target.max;
    const min = +e.target.min;

    const left = value * (num_width / max) - num_label_width / 2 + scale(value, min, max, 10, -10);
    label.style.left = `${left + 80}px`;


    label.innerHTML = value;
    });

    const scale = (num, in_min, in_max, out_min, out_max) => {
        return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
    };
  }

  render() {

    return (
      <div className="container-fluid text-center">
        <div className="row">
          <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '1024px' }}>
            <div className="content">
              <p>&nbsp;</p>
              <h1 style={{color: "#5c13ec", fontFamily: "copperplate"}}>CRYPTO BOX ORGANIZATION <span><i style={{color: "gold", fontSize: "32px"}} class="fa fa-solid fa-star"></i></span></h1>
              <a type="button" class="btn btn-default" data-bs-toggle="modal" data-bs-target="#organizationModal">
              <i style={{color: "#5c13ec", fontSize: "40px"}} class="fa fa-plus-circle" aria-hidden="true"></i>
              </a>
              <div style={{fontFamily: "cursive"}} class="modal fade modal-dialog modal-dialog-centered modal-dialog-scrollable" id="organizationModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalLabel">Create an Organization</h5>
                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                      <form>
                        <div class="mb-3">
                          <label for="orgTitle" class="form-label">Organization Title: </label>
                          <input type="text" class="form-control" id="orgTitle" aria-describedby="orgTitle" required />
                        </div>
                        <div class="form-floating mb-3">
                          <textarea style={{height: "100px"}} class="form-control" placeholder="Enter Organization Description: " id="orgDescription" required ></textarea>
                          <label for="orgDescription">Org Description: </label>
                        </div>
                        <div class="range-container">
                          <input type="range" id="range" min="0" max="100" />
                          <label for="range">50</label>
                      </div>
                        <div class="mb-3 form-check">
                          <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                          <label class="form-check-label" for="exampleCheck1">Check me out</label>
                        </div>
                        <button type="submit" class="btn btn-primary">Submit</button>
                      </form>
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                      <button type="button" class="btn btn-primary">Save changes</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }
}

export default OrganizationMain;