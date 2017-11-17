import * as assert from 'assert';
import { User } from '../../src/models/User';
import { app } from '../../src/app';
import { compareSync } from 'bcrypt';

import * as request from 'supertest';
