import * as React from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { Button } from '@mui/material';

import SearchBar from './SearchBar';
import TemplateBox from './TemplateBox';
import EditTemplateDialog from './EditTemplateDialog';

export default function Templates () {
  const [showEditDialog, setShowEditDialog] = React.useState(false)
  const [menuValue, setMenuValue] = useState('static');
  const [entries, setEntries] = useState([]);
  const [templateName, setTemplateName] = useState(''); 
  const [templateNamesList, setTemplateNamesList] = useState([]);

  //fetches all templates from the database
  useEffect(() => {
    window.api.invoke('read-template-names').then(names => {
      setTemplateNamesList(names);
    });
  }, []);

  const createTemplate = () => {
    console.log('created template')
    setShowEditDialog(true)
  }

  const saveTemplate = () => {
    window.api.invoke('create-template', templateName).then(templateId => {
      for (const entry of entries) {
        window.api.invoke('create-entry', templateId, entry.menuValue, entry.keyword, entry.replacementText);
      }
    });
  
    setShowEditDialog(false)
    setMenuValue('static')
    setEntries([])
    setTemplateName('')
  }
  
  const closeEditDialog = () => {
    setShowEditDialog(false)
    setMenuValue('static')
    setEntries([])
    setTemplateName('')
  }

  return (
        <Box sx={{ overflow: 'auto' }}>
          <SearchBar />
          <Button
            variant="contained"
            color="secondary"
            sx={{ width: '90%',alignSelf: 'center', margin: '10px' }}
            onClick={createTemplate}
          >
          NEW TEMPLATE
          </Button>
          <EditTemplateDialog 
            show={showEditDialog}
            close={closeEditDialog} 
            save={saveTemplate} 
            menuValue={menuValue} 
            setMenuValue={setMenuValue} 
            entries={entries} 
            setEntries={setEntries}
            templateName={templateName}
            setTemplateName={setTemplateName}
          />
          <Divider />
          {templateNamesList.map((template) => (
            <TemplateBox 
              template={template} 
              key={template.id} 
            /> 
          ))}
        </Box>
  )
}