import React from "react";
import { Input } from "../../../Components/Input";
import { DropdownSelector } from "../../../Components/DropdownSelector";
const STUDY_YEAR_OPTIONS = [
  { label: "1st Year", value: "year_1" },
  { label: "2nd Year", value: "year_2" },
  { label: "3rd Year", value: "year_3" },
  { label: "4th Year+", value: "year_4_plus" },
  { label: "Postgrad", value: "postgrad" },
];

const COLLAB_OPTIONS = [
  { label: "Actively looking", value: "active" },
  { label: "Open if interesting", value: "selective" },
  { label: "Not right now", value: "closed" },
];

export const BasicInfoFields = ({ data, onUpdate, roles, activeDropdown, setActiveDropdown }) => {
  const selectedYearLabel = STUDY_YEAR_OPTIONS.find(y => y.value === data.study_year)?.label;
  const currentCollabLabel = COLLAB_OPTIONS.find(c => c.value === data.collab_status)?.label;

  return (
    <div className="space-y-10">
      <Input 
        label="Display Name *" 
        value={data.username || ""} 
        onChange={(e) => onUpdate({ username: e.target.value })} 
      />
      
      <Input 
        label="College / Institution *" 
        value={data.college_name || ""} 
        onChange={(e) => onUpdate({ college_name: e.target.value })} 
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <DropdownSelector
          label="Academic Year *"
          placeholder="Select Year"
          value={selectedYearLabel}
          options={STUDY_YEAR_OPTIONS}
          isOpen={activeDropdown === 'year'}
          setIsOpen={(val) => setActiveDropdown(val ? 'year' : null)}
          onSelect={(opt) => onUpdate({ study_year: opt.value })}
        />

        <DropdownSelector
          label="Collaboration Status *"
          placeholder="Select Status"
          value={currentCollabLabel}
          options={COLLAB_OPTIONS}
          isOpen={activeDropdown === 'collab'}
          setIsOpen={(val) => setActiveDropdown(val ? 'collab' : null)}
          onSelect={(opt) => onUpdate({ collab_status: opt.value })}
        />
      </div>

      <DropdownSelector
        label="Primary Role *"
        placeholder="Select your main role"
        value={data.role_name}
        options={roles.map(r => ({ label: r.name, value: r.id }))}
        isOpen={activeDropdown === 'role'}
        setIsOpen={(val) => setActiveDropdown(val ? 'role' : null)}
        onSelect={(opt) => onUpdate({ role_id: opt.value, role_name: opt.label })}
      />
    </div>
  );
};