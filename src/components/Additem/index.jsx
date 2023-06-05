import React from 'react'
import DataTableCom from "../Home/dataTable"

const AddItem = () => {
  return (
    <>

      <div className="home_container">
        <h1 className='add_card_title'>Add car</h1>
        <div className='car_form'>
          <div>
            <div>Make</div>
            <div className='add_cat'>
              <input placeholder='Make' className='input_ele' />
            </div>
          </div>
          <div>
            <div>Modal</div>
            <div className='add_cat'>
              <input placeholder='Modal' className='input_ele' />
            </div>
          </div>
        </div>
        <div className='car_form'>
          <div>
            <div>Year</div>
            <div className='add_cat'>
              <input placeholder='Year' className='input_ele' />
            </div>

          </div>
          <div>
            <div>Color</div>
            <div className='add_cat'>
              <input placeholder='Color' className='input_ele' />
            </div>

          </div>
        </div>
        <div className='car_form'>
          <div>
            <div>Mileage</div>
            <div className='add_cat'>
              <input placeholder='Mileage' className='input_ele' />
            </div>

          </div>
          <div>
            <div>Description</div>
            <div className='add_cat'>
              <input placeholder='Description' className='input_ele' />
            </div>

          </div>


        </div>
        <div className='cat_submit'>Submit</div>
        <DataTableCom />
      </div>
    </>
  )
}

export default AddItem