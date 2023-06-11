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
  const [templateId, setTemplateId] = useState(null);
  const [deletedEntries, setDeletedEntries] = useState([]);

  //fetches all templates from the database
  useEffect(() => {
    window.api.invoke('read-template-names').then(names => {
      setTemplateNamesList(names);
    });
  }, []);

  //fetches the asscoiated entries for a template
  const fetchTemplateEntries = async (templateId) => {
    if (templateId) {
      try {
        const entries = await window.api.invoke('read-template-entries', templateId);
        setEntries(entries);
      } catch (error) {
        console.error('Failed to fetch entries for template:', error);
      }
    }
  }

  const handleNewTemplate = () => {
    setMenuValue('static')
    setEntries([])
    setTemplateName('')
    setTemplateId(null)
    setShowEditDialog(true)
  }

  const handleSave = () => {
    if (templateId) {
      updateTemplate();
    } else {
      saveTemplate();
    }
  }

  const saveTemplate = () => {
    window.api.invoke('create-template', templateName).then(templateId => {
      for (const entry of entries) {
        window.api.invoke('create-entry', templateId, entry.menuValue, entry.keyword, entry.replacementText);
      }
      window.api.invoke('read-template-names').then(names => {
        setTemplateNamesList(names);
      });
      fetchTemplateEntries(templateId);
    });
    setShowEditDialog(false)
    setMenuValue('static')
    setEntries([])
    setTemplateName('')
    setTemplateId(null)
  }

  const updateTemplate = () => {
    window.api.invoke('update-template-name', templateId, templateName).then(() => {
      const deletePromises = deletedEntries.map(entryId => {
        return window.api.invoke('delete-entry', entryId);
      });
  
      Promise.all(deletePromises).then(() => {
        const updatePromises = entries.map(entry => {
          if (entry.id) {
            return window.api.invoke('update-entry', entry.id, entry.menuValue, entry.keyword, entry.replacementText);
          } else {
            return window.api.invoke('create-entry', templateId, entry.menuValue, entry.keyword, entry.replacementText);
          }
        });
    
        Promise.all(updatePromises).then(() => {
          window.api.invoke('read-template-names').then(names => {
            setTemplateNamesList(names);
          });
    
          fetchTemplateEntries(templateId);
        });
      });
    });
    setShowEditDialog(false)
    setMenuValue('static')
    setEntries([])
    setTemplateName('')
    setDeletedEntries([])
  }
  

  const deleteTemplate = () => {
    window.api.invoke('delete-template', templateId).then(() => {
      window.api.invoke('delete-template-entries', templateId).then(() => {
        window.api.invoke('read-template-names').then(names => {
          setTemplateNamesList(names);
        });
      });
    });
    console.log(`deleted template: ${templateId}`);
    setShowEditDialog(false)
    setMenuValue('static')
    setEntries([])
    setTemplateName('')
    setTemplateId(null)
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
            onClick={handleNewTemplate}
          >
          NEW TEMPLATE
          </Button>
          <EditTemplateDialog 
            show={showEditDialog}
            close={closeEditDialog} 
            save={handleSave} 
            menuValue={menuValue} 
            setMenuValue={setMenuValue} 
            entries={entries} 
            setEntries={setEntries}
            templateName={templateName}
            deleteTemplate={deleteTemplate}
            setTemplateName={setTemplateName}
            setDeletedEntries={setDeletedEntries}
          />
          <Divider />
          {templateNamesList.map((template) => (
            <TemplateBox 
              template={template} 
              key={template.id}
              setTemplateName={setTemplateName}
              setShowEditDialog={setShowEditDialog}
              fetchTemplateEntries={fetchTemplateEntries}
              setTemplateId={setTemplateId}
            /> 
          ))}
        </Box>
  )
}