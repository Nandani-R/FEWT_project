function ReviewCard({ user, rating, comment }) {

  return (

    <div className="review-card">

      <div className="review-top">

        <div className="review-user">

          <div className="user-avatar">
            {user.charAt(0)}
          </div>

          <strong>{user}</strong>

        </div>

        <span className="review-rating">
          ★ {rating}/10
        </span>

      </div>

      <p>
        {comment}
      </p>

    </div>

  );
}

export default ReviewCard;