import { useSupabaseClient } from '@supabase/auth-helpers-react';
import React, { FC, useEffect, useState } from 'react';
// import supabase from '../../api/supabase';
import './HomePageCompStyle.css'




export const HomePageComp: FC = () => {



    return (
        <div className='homepage_container'>
            <h1 className='homepage_header'>HOME PAGE</h1>
            <div className='homepage_textabout_container'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia, sunt.
            </div>
        </div>
    )
}