import React from 'react';

const SectionHeader = ({ title, icon: Icon }) => (
  <div className="section-header">
    {Icon && <Icon size={16} />}
    {title}
  </div>
);

export default SectionHeader;
