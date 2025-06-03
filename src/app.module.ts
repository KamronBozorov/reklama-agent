import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users/models/user.model';
import { ClientsModule } from './clients/clients.module';
import { StatusModule } from './status/status.module';
import { Client } from './clients/models/client.model';
import { Status } from './status/models/status.model';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AuthModule } from './auth/auth.module';
import { MailService } from './mail/mail.service';
import { MailModule } from './mail/mail.module';
import { EmployeesModule } from './employees/employees.module';
import { RolesModule } from './roles/roles.module';
import { DeparmentModule } from './deparment/deparment.module';
import { Department } from './deparment/models/deparment.model';
import { Employee } from './employees/models/employee.model';
import { Role } from './roles/models/role.model';
import { EmployeeRoleModule } from './employee-role/employee-role.module';
import { EmployeeRole } from './employee-role/models/employee-role.model';
import { CampaignsModule } from './campaigns/campaigns.module';
import { Campaign } from './campaigns/models/campaign.model';
import { AdvertisementsModule } from './advertisements/advertisements.module';
import { PlacementsModule } from './placements/placements.module';
import { Advertisement } from './advertisements/models/advertisement.model';
import { Placement } from './placements/models/placement.model';
import { MediaChannelModule } from './media-channel/media-channel.module';
import { PerformanceMetricsModule } from './performance-metrics/performance-metrics.module';
import { MediaChannel } from './media-channel/models/media-channel.model';
import { PerformanceMetric } from './performance-metrics/models/performance-metric.model';
import { MeetingsModule } from './meetings/meetings.module';
import { Meeting } from './meetings/models/meeting.model';
import { PaymentsModule } from './payments/payments.module';
import { InvoicesModule } from './invoices/invoices.module';
import { PaymentMethodModule } from './payment_method/payment_method.module';
import { Payment } from './payments/models/payment.model';
import { PaymentMethod } from './payment_method/models/payment_method.model';
import { Invoice } from './invoices/models/invoice.model';
import { WinstonModule } from 'nest-winston';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    WinstonModule.forRoot({}),
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.PG_HOST,
      port: Number(process.env.PG_PORT),
      username: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DB,
      models: [
        User,
        Client,
        Status,
        Department,
        Employee,
        Role,
        EmployeeRole,
        Campaign,
        Advertisement,
        Placement,
        MediaChannel,
        PerformanceMetric,
        Meeting,
        Payment,
        Invoice,
        PaymentMethod,
      ],
      autoLoadModels: true,
      sync: {
        alter: true,
      },
      logging: false,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      playground: true,
    }),
    UsersModule,
    ClientsModule,
    StatusModule,
    AuthModule,
    MailModule,
    EmployeesModule,
    RolesModule,
    DeparmentModule,
    RolesModule,
    EmployeeRoleModule,
    CampaignsModule,
    AdvertisementsModule,
    PlacementsModule,
    MediaChannelModule,
    PerformanceMetricsModule,
    MeetingsModule,
    PaymentsModule,
    InvoicesModule,
    PaymentMethodModule,
  ],
  controllers: [],
  providers: [MailService],
})
export class AppModule {}
