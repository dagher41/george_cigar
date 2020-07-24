import _pick from 'lodash/pick'
import AdminViewController from '../../lib/admin-view-controller';
import {
  BusinessHour
} from '../../../models';

export default class BusinessHourViewController extends AdminViewController {

  async upsertAction({ catalog, body: { business_hour: { day_of_week: dayOfWeek, close_time: closeTime, open_time: openTime, is_closed: isClosed } } }, res) {
    let [businessHour] = await BusinessHour.findOrCreate({
      where: { catalogId: catalog.id, dayOfWeek },
      attributes: ['id', 'openTime', 'closeTime', 'dayOfWeek']
    });

    if (isClosed) {
      businessHour.openTime = null;
      businessHour.closeTime = null;
    } else {
      businessHour.openTime = openTime ? openTime : businessHour.openTime;
      businessHour.closeTime = closeTime ? closeTime : businessHour.closeTime;
    }
    await businessHour.save();

    return super.updateAction({ res, json: _pick(businessHour, ['id', 'openTime', 'closeTime', 'dayOfWeek']) })
  }
}