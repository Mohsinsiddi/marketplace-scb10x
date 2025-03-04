const { db } = require("../firebase")





exports.getDisputes = async (req, res, next) => {
  try {
    allDisputes = await db.collection("disputes").get();
    let result = []
    allDisputes.forEach(doc => {
      result.push(doc.data())
    });

    res.status(200).json({ status: "ok", disputes: result })

  } catch (error) {
    next(error)
  }
}

exports.getDisputeById = async (req, res, next) => {
  try {
    if (!req || !req.params) {
      return res.status(400).json({ message: "missing query params" })
    }
    const { id } = req.params

    console.log("getting dispute with ID: ", id)

    const dispute = await db.collection('disputes').where('disputeId', '==', Number(id)).get()
    if (dispute.empty) {
      return res.status(400).json({ message: "dispute with this ID does not exist" })
    }
    let result = []
    dispute.forEach(doc => {
      result.push(doc.data())
    });
    res.status(200).json({ status: "ok", dispute: result[0] })

  } catch (error) {
    next(error)
  }
}

exports.createDispute = async (req, res, next) => {
  try {

    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: " req.body missing " })
    }
    console.log(req.body)

    const { email, address, orderLink, type, comments } = req.body

    if (!(email && address && orderLink && type && comments)) {
      return res.status(400).json({ message: "some required fields are missing" })
    }

    //getting all disputes
    const allDisputes = await db.collection("disputes").get();
    const result = allDisputes.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    //to be edited

    //assigning disputeId
    const disputeId = result.reduce((result, item) => {
      if (Number(item.disputeId) > result) {
        result = Number(item.disputeId)
      }
      return result
    }, 0) + 1
    console.log("Creating dispute with ID:", disputeId)

    const disputeItem = {
      ...req.body,
      "disputeId": disputeId,
      "email": email,
      "address": address,
      "orderLink": orderLink,
      "type": type,
      "comments": comments,
      "resolved": false, //for admin to update the dispute status after resolving the issue
      "adminComment": "", // for admin dispute related comments
      "timestamp": Math.floor(new Date().valueOf() / 1000)
    }

    console.log(disputeItem)

    await db.collection('disputes').add(disputeItem)

    res.status(200).json({ status: "ok", body: req.body, disputeId })
    //end of to be edited

  } catch (error) {
    next(error)
  }
}

exports.updateDispute = async (req, res, next) => {
  try {

    if (!req || !req.params) {
      return res.status(400).json({ message: "missing query params" })
    }
    const { id } = req.params

    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: " req.body missing " })
    }
    const { resolved, adminComment } = req.body

    if (!Object.keys(req.body).length) {
      return res.status(400).json({ message: "update failed. At least one input is required." })
    }

    console.log("getting dispute with ID: ", id)

    const dispute = await db.collection('disputes').where('disputeId', '==', Number(id)).get()
    if (dispute.empty) {
      return res.status(400).json({ message: "dispute with this ID does not exist" })
    }
    let Item = {}
    let DocID = ""
    dispute.forEach(doc => {
      Item = doc.data()
      DocID = doc.id
    });
    console.log({ Item, DocID })

    if (resolved !== undefined) {
      Item.resolved = resolved
    }
    if (adminComment !== undefined) {
      Item.adminComment = adminComment
    }
    console.log("Saving: \n", Item)

    await db.collection("disputes").doc(DocID).set(Item, { merge: true })

    res.status(200).json({ status: "ok", Item })
  } catch (error) {
    next(error)
  }
}