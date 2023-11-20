import { useState } from 'react';
import { Group, Code } from '@mantine/core';
import {
  IconSettings,
  IconSwitchHorizontal,
  IconLogout,
  IconBuildingStore,
  IconCategory,
  IconUser,
  IconCopy,
} from '@tabler/icons-react';
import { MantineLogo } from '@mantine/ds';
import classes from './sidebar.module.css';

const data = [
  { link: '/', label: 'Products', icon: IconBuildingStore },
  { link: '/category', label: 'Category', icon: IconCategory },
  { link: '#', label: 'User', icon: IconUser },
  { link: '#', label: 'Other Settings', icon: IconSettings },
];

export function Sidebar() {
  const [active, setActive] = useState('Products');

  const links = data.map((item) => (
    <a
      className={classes.link}
      data-active={item.label === active || undefined}
      href={item.link}
      key={item.label}
      onClick={(event) => {
        event.preventDefault();
        setActive(item.label);
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </a>
  ));

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>
        <Group className={classes.header} justify="space-between">
          <MantineLogo size={28} />
          <Code fw={700}>v3.1.2</Code>
        </Group>
        {links}
      </div>

      <div className={classes.footer}>
        <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
          <IconSwitchHorizontal className={classes.linkIcon} stroke={1.5} />
          <span>Change account</span>
        </a>

        <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Logout</span>
        </a>

        <a href="https://github.com/Geusan31/mantine_ugm.git" className={classes.link} onClick={(event) => event.preventDefault()}>
          <IconCopy className={classes.linkIcon} stroke={1.5} />
          <span>Clone from Geusan31</span>
        </a>
      </div>
    </nav>
  );
}