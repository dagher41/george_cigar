import BusinessHourViewController from './business-hour.controller';

const { router, controller } = BusinessHourViewController.buildResource('business_hours', [])

router.put('/business_hours/upsert', controller.upsertAction)

export default router;