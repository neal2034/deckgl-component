import React, { ChangeEvent } from 'react';
import {
  Button,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  Switch,
} from '@mui/material';
import { ScatterplotLayer, TextLayer } from '@deck.gl/layers/typed';
import './controlPannel.css';

interface IControlPanelProps {
  layers: (TextLayer | ScatterplotLayer)[];
  handleToggle: (index: number) => void;
  addLayer: (geojsonFile: File) => void;
}

const ControlPanel = (props: IControlPanelProps): JSX.Element => {
  const { layers, handleToggle, addLayer } = props;

  const onFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      addLayer(event.target.files[0]);
      event.target.value = '';
    }
  };

  return (
    <div className="panel">
      <List
        sx={{
          width: '100%',
          maxWidth: 360,
          bgcolor: 'background.paper',
        }}
        subheader={
          <ListSubheader
            sx={{ fontSize: '16px', fontWeight: 'bold', color: '#666666' }}
          >
            Control Panel
          </ListSubheader>
        }
      >
        {layers.map((item, index) => {
          return (
            index % 2 == 0 && (
              <ListItem key={item.id}>
                <ListItemText
                  id={item.id}
                  primary={'Layer-' + (index / 2 + 1)}
                  sx={{ color: '#666' }}
                />
                <Switch
                  edge="end"
                  checked={item.props.visible}
                  onChange={() => handleToggle(index / 2)}
                  inputProps={{
                    'aria-labelledby': 'switch-list-label-wifi',
                  }}
                />
              </ListItem>
            )
          );
        })}

        <ListItem>
          <Button variant={'contained'} component={'label'}>
            <input
              hidden
              accept=".geojson"
              type="file"
              onChange={onFileUpload}
            />
            Add Layer
          </Button>
        </ListItem>
      </List>
    </div>
  );
};

export default ControlPanel;
