import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { ROLES } from '../../utils/constants';

interface RoleSelectorProps {
  role: string;
  setRole: (role: string) => void;
}

const RoleSelector = ({ role, setRole }: RoleSelectorProps) => {
  return (
    <FormControl component="fieldset" sx={{ mb: 2 }}>
      <FormLabel component="legend">Login As</FormLabel>
      <RadioGroup
        row
        aria-label="role"
        name="role"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      >
        <FormControlLabel
          value={ROLES.ALUMNI}
          control={<Radio />}
          label="Alumni"
        />
        <FormControlLabel
          value={ROLES.ADMIN}
          control={<Radio />}
          label="Admin"
        />
      </RadioGroup>
    </FormControl>
  );
};

export default RoleSelector;