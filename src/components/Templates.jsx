import * as React from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { Button, TextField} from '@mui/material';
import TemplateBox from './TemplateBox';
import EditTemplateDialog from './EditTemplateDialog';
import { useSelector, useDispatch } from 'react-redux';
import { showEditDialog, templateArray, menuValue, entries } from '../redux/actions';

export default function Templates () {
  const dispatch = useDispatch();

  const templateData = useSelector(state => state.templateArray);
  const entyData = useSelector(state => state.entries);
  
  // redo this to use redux
  const [templateName, setTemplateName] = useState(''); 
  const [templateId, setTemplateId] = useState(null);
  const [deletedEntries, setDeletedEntries] = useState([]);
  const [filteredTemplates, setFilteredTemplates] = useState(templateData);
  const [newTemplate, setNewTemplate] = useState(false);
  

  //fetches all templates from the database
  useEffect(() => {
    window.api.invoke('read-template-names').then(names => {
      dispatch(templateArray(names));
      setFilteredTemplates(names);
    });
  }, []);

  //fetches the asscoiated entries for a template
  const fetchTemplateEntries = async (templateId) => {
    if (templateId) {
      try {
        const entryData = await window.api.invoke('read-template-entries', templateId);
        dispatch(entries(entryData));
      } catch (error) {
        console.error('Failed to fetch entries for template:', error);
      }
    }
  }
  
  const handleNewTemplate = () => {
    dispatch(menuValue('static'));
    dispatch(entries([]));
    setTemplateName('')
    setTemplateId(null)
    setNewTemplate(true);
    dispatch(showEditDialog(true))
  }
  
  const closeEditDialog = () => {
    dispatch(showEditDialog(false))
    dispatch(menuValue('static'));
    dispatch(entries([]));
    setTemplateName('')
    setTemplateId(null)
    setDeletedEntries([]);
    setNewTemplate(false);
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
      for (const entry of entyData) {
        if (entry.menuValue === 'static' ) {
          window.api.invoke('create-entry', templateId, entry.menuValue, entry.keyword, entry.replacementText);
        }
        if (entry.menuValue === 'dynamic' ) {
          window.api.invoke('create-entry', templateId, entry.menuValue, entry.keyword, ''); // no replacement text for dynamic entries
        }
      }
      window.api.invoke('read-template-names').then(names => {
        dispatch(templateArray(names));
        setFilteredTemplates(names);
      });
      fetchTemplateEntries(templateId);
    });
    closeEditDialog();
  }

  const updateTemplate = () => {
    window.api.invoke('update-template-name', templateId, templateName).then(() => {
      const deletePromises = deletedEntries.map(entryId => {
        return window.api.invoke('delete-entry', entryId);
      });
  
      Promise.all(deletePromises).then(() => {
        const updatePromises = entyData.map(entry => {
          if (entry.id) {
            return window.api.invoke('update-entry', entry.id, entry.menuValue, entry.keyword, entry.replacementText);
          } else {
            return window.api.invoke('create-entry', templateId, entry.menuValue, entry.keyword, entry.replacementText);
          }
        });
    
        Promise.all(updatePromises).then(() => {
          window.api.invoke('read-template-names').then(names => {
            dispatch(templateArray(names));
            setFilteredTemplates(names);
          });
          fetchTemplateEntries(templateId);
        });
      });
    });
    closeEditDialog();
  }
  

  const deleteTemplate = () => {
    window.api.invoke('delete-template', templateId).then(() => {
      window.api.invoke('delete-template-entries', templateId).then(() => {
        window.api.invoke('read-template-names').then(names => {
          dispatch(templateArray(names));
          setFilteredTemplates(names);
        });
      });
    });
    console.log(`deleted template: ${templateId}`);
    closeEditDialog();
  }

  
  const searchTemplates = (event) => {
    const searchValue = event.target.value.toLowerCase();
    const newFilteredTemplates = templateData.filter(template => {
      return template.name.toLowerCase().includes(searchValue);
    });
    setFilteredTemplates(newFilteredTemplates);
  }


  return (
    <Box sx={{ overflow: 'auto' }}>
      <TextField
      placeholder="Search Templates"
      onChange={searchTemplates}
      sx={{ width: '95%', alignSelf: 'center', margin: '5px' }}
    />
      <Button
        variant="contained"
        color="secondary"
        sx={{ width: '95%',alignSelf: 'center', margin: '5px' }}
        onClick={handleNewTemplate}
      >
        NEW TEMPLATE
      </Button>
      <EditTemplateDialog 
        close={closeEditDialog} 
        save={handleSave} 
        templateName={templateName}
        deleteTemplate={deleteTemplate}
        setTemplateName={setTemplateName}
        setDeletedEntries={setDeletedEntries}
        newTemplate={newTemplate}
      />
      <Divider sx={{ width: '95%', alignSelf: 'center', margin: '5px' }} />
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
      }}>
        {filteredTemplates.map((template) => (
          <TemplateBox 
            template={template} 
            key={template.id}
            setTemplateName={setTemplateName}
            fetchTemplateEntries={fetchTemplateEntries}
            setTemplateId={setTemplateId}
          /> 
        ))}
      </div>
    </Box>
  )
}