package org.team14.rubikonline.object;

import java.lang.Long;
import java.time.OffsetDateTime;

public class Record {
	private Long duration;
	private OffsetDateTime datetime;
	private String userName;

	public Record() {
	}

	public Record(Long duration, OffsetDateTime datetime, String userName) {
		this.duration = duration;
		this.datetime = datetime;
		this.userName = userName;
	}

	public Long getDuration() {
		return duration;
	}

	public void setDuration(Long duration) {
		this.duration = duration;
	}

	public OffsetDateTime getDatetime() {
		return datetime;
	}

	public void setDatetime(OffsetDateTime datetime) {
		this.datetime = datetime;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

}
