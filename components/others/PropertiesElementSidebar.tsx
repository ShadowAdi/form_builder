import React from 'react'
import useDesigner from '../hooks/useDesigner';
import { FormElements } from './FormElements';
import { Button } from '../ui/button';
import {AiOutlineClose  } from "react-icons/ai";
import { Separator } from '../ui/separator';
const PropertiesElementSidebar = () => {
    const { selectedElement,setSelectedElement } = useDesigner();
    if (!selectedElement) {
        return null
    }

    const PropertiesComponent=FormElements[selectedElement?.type].propertiesComponent

  return (
    <div className='flex flex-col p-2 '>
        <div className="justify-between items-center">
            <p className='text-sm text-foreground/70 '>
            Element Properties
            </p>
            <Button size={"icon"} variant={"ghost"} onClick={()=>{setSelectedElement(null)}}>
                <AiOutlineClose />
            </Button>
        </div>
        <Separator className='mb-4'/>
        <PropertiesComponent elementInstance={selectedElement}/>
    </div>
  )
}

export default PropertiesElementSidebar