import OneSignal from 'onesignal-node'
import { getRepository } from 'typeorm'

class OneSignalService {

  personRepository = getRepository('person')

  constructor() {
    this.myClient = new OneSignal.Client({
      app: {
        appAuthKey: 'MDI4MDAwODUtZjQ2NC00MGFmLTlkYTctNWRhMzlkMDliMjY0',
        appId: '0596fb61-668e-4d9a-ba3a-3d5a3de4e16a'
      }
    });
  }

  async sendNotification(message, user) {

    const receiver = await this.personRepository.findOne({ id: message.receiverId })
    console.log('sending notification', user.oneSignalId)
    var firstNotification = new OneSignal.Notification({
      contents: { en: 'new message from ' + user.firstName },
      include_player_ids: [receiver.oneSignalId]
    });

    this.myClient.sendNotification(firstNotification, function (err, httpResponse, data) {
      if (err) {
        console.log('Something went wrong...');
      } else {
        console.log(data);
      }
    });
  }

}

export default new OneSignalService()